import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#00000066] flex items-center justify-center px-4"
      style={{ zIndex: 48 }}
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
        <div className={cn("flex-1 overflow-y-auto p-4", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
