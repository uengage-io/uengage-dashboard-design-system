import * as React from "react";
import { cn } from "../../../lib/utils";
import { toCssSize, type CssSize } from "../../../utils/layoutTokens";

export interface AppSidebarProduct {
  id: string | number;
  name: string;
  /** URL or ReactNode icon */
  icon?: React.ReactNode;
}

export interface AppSidebarModule {
  /** Unique page/slug identifier */
  page: string;
  /** Display name */
  label: string;
}

export interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** List of products shown in the left column */
  products?: AppSidebarProduct[];
  /** List of modules shown in the right column for the active product */
  modules?: AppSidebarModule[];
  /** id of the currently active product */
  activeProductId?: string | number;
  /** page slug of the currently active module */
  activeModulePage?: string;
  /** Called when a product button is clicked */
  onProductSelect?: (product: AppSidebarProduct) => void;
  /** Called when a module button is clicked */
  onModuleClick?: (module: AppSidebarModule) => void;
  /** Collapse/expand the sidebar */
  collapsed?: boolean;
  /**
   * Distance from the top of the viewport (to clear the fixed header).
   * @default 64
   */
  offsetTop?: CssSize;
  /** Optional slot rendered at the bottom of the right column (e.g. version badge) */
  footer?: React.ReactNode;
}

function AppSidebar({
  products = [],
  modules = [],
  activeProductId,
  activeModulePage,
  onProductSelect,
  onModuleClick,
  collapsed = false,
  offsetTop = 64,
  footer,
  className,
  style,
  ...props
}: AppSidebarProps) {
  return (
    <>
      <style>{`
        [data-slot="app-sidebar-modules-scroll"] {
          scrollbar-width: thin;
          scrollbar-color: #006F42 transparent;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar {
          width: 2px;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-track {
          background: transparent;
          margin-block: 6px;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-thumb {
          background-color: #006F42;
          border-radius: 9999px;
        }
        [data-slot="app-sidebar-modules-scroll"]:hover::-webkit-scrollbar-thumb {
          background-color: #3a8a5a;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-thumb:hover {
          background-color: #1f6b40;
        }
      `}</style>
      <aside
      data-slot="app-sidebar"
      data-collapsed={collapsed}
      className={cn(
        "uengage-ui fixed bottom-0 left-0 z-40 flex w-full flex-col md:w-[240px]",
        "bg-[#FAFFF7] transition-transform duration-[250ms] ease-in-out",
        collapsed && "-translate-x-full",
        className,
      )}
      style={{ top: toCssSize(offsetTop), ...style }}
      {...props}
    >
      {/* ── Main row: products + modules ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: product list ── */}
        <div
          data-slot="app-sidebar-products"
          className="relative flex w-[35%] flex-col items-end bg-[#FAFFF7]"
        >
          {products.map((product) => {
            const isActive = product.id === activeProductId;
            return (
              <button
                key={product.id}
                type="button"
                data-active={isActive}
                onClick={() => onProductSelect?.(product)}
                className={cn(
                  "mt-2 flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-l-lg transition-colors",
                  isActive ? "bg-[#C8E7B8]" : "hover:bg-[#E3F5E3]",
                )}
              >
                {product.icon != null && (
                  <span
                    data-slot="app-sidebar-product-icon"
                    className="shrink-0 [&_svg]:h-[13px] [&_svg]:w-[13px]"
                  >
                    {product.icon}
                  </span>
                )}
                <span
                  data-slot="app-sidebar-product-name"
                  className="mt-1.5 text-center text-[0.75rem] font-bold text-[#003C1B]"
                >
                  {product.name.split(" ").map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Right: module list ── */}
        <div
          data-slot="app-sidebar-modules"
          className="flex h-full w-[65%] flex-col bg-[#FAFFF7]"
          style={{
            borderLeft: "1px solid",
            borderImage:
              "linear-gradient(134.33deg, #C8E7B8 3.98%, #00A86B 104.92%) 1",
          }}
        >
          {/* Scrollable module list */}
          <div
            data-slot="app-sidebar-modules-scroll"
            className="mt-2 flex-1 cursor-pointer overflow-y-auto"
          >
            {modules.map((module, index) => {
              const isActive = module.page === activeModulePage;
              return (
                <React.Fragment key={module.page}>
                  <button
                    type="button"
                    data-active={isActive}
                    onClick={() => onModuleClick?.(module)}
                    className={cn(
                      "w-[90%] cursor-pointer rounded-r-lg py-[13px] pl-2 text-left text-[14px] text-[#003C1B] transition-all",
                      isActive
                        ? "border-[#003C1B] bg-[#C8E7B8] font-bold"
                        : "font-semibold hover:bg-[#E8F5E3]",
                    )}
                  >
                    <span className="block w-full whitespace-normal break-normal">
                      {module.label}
                    </span>
                  </button>
                  {!isActive && modules[index + 1]?.page !== activeModulePage && (
                    <div className="w-[85%] border-b border-[#E0E0E0]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Full-width footer slot ── */}
      {footer != null && (
        <div
          data-slot="app-sidebar-footer"
          className="w-full shrink-0 border-t bg-[#FAFFF7]"
        >
          {footer}
        </div>
      )}
    </aside>
    </>
  );
}

AppSidebar.displayName = "AppSidebar";

export { AppSidebar };
