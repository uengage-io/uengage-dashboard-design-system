import * as React from "react";
import * as ReactDOM from "react-dom";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ModalZIndexProvider } from "@/lib/zIndexContext";

const modalSizeVariants = cva("bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col w-full", {
  variants: {
    size: {
      small: "max-w-md",
      medium: "max-w-2xl",
      md: "max-w-3xl",
      default: "max-w-4xl",
      large: "max-w-6xl",
      full: "max-w-7xl",
    },
  },
  defaultVariants: { size: "default" },
});

export interface ModalProps extends VariantProps<typeof modalSizeVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeIcon?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  modalClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "default",
  showCloseButton = true,
  closeIcon,
  headerClassName,
  bodyClassName,
  modalClassName,
}: ModalProps) {
  const mouseDownOnBackdropRef = React.useRef(false);

  React.useEffect(() => {
    if (!isOpen) return;
    // Capture scroll position before locking — iOS Safari ignores overflow:hidden on body,
    // so we use position:fixed + top offset to prevent background scroll on all platforms.
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Track whether the press *started* on the backdrop, not just where the click lands —
  // content inside the modal (e.g. a tab switch) can resize/recenter the modal between
  // mousedown and mouseup, landing the click on the backdrop even though the press began
  // on an inner element. Only treat it as an outside click if both events agree.
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownOnBackdropRef.current = e.target === e.currentTarget;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const shouldClose = e.target === e.currentTarget && mouseDownOnBackdropRef.current;
    mouseDownOnBackdropRef.current = false;
    if (shouldClose) onClose();
  };

  const modal = (
    <div
      className="fixed inset-0 bg-[#00000066] flex items-center justify-center px-4 outline-none"
      style={{ zIndex: 9999 }}
      onMouseDown={handleBackdropMouseDown}
      onClick={handleBackdropClick}
    >
      <div className={cn(modalSizeVariants({ size }), modalClassName)}>
        {(title || showCloseButton) && (
          <div className={cn("flex justify-between items-center border-b border-gray-300 p-2", headerClassName)}>
            {title && <h5 className="text-lg p-2 font-bold">{title}</h5>}
            {showCloseButton && (
              <button
                type="button"
                className="rounded-md transition-colors font-bold text-lg cursor-pointer p-2 text-gray-600 hover:text-gray-900"
                onClick={onClose}
                aria-label="Close modal"
              >
                {closeIcon ?? <X className="size-5" />}
              </button>
            )}
          </div>
        )}
        <ModalZIndexProvider>
          <div className={cn("flex-1 overflow-y-auto p-4 outline-none", bodyClassName)}>
            {children}
          </div>
        </ModalZIndexProvider>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
