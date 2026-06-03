import * as React from "react";

interface ZIndexValues {
  popover: number;
}

const ZIndexContext = React.createContext<ZIndexValues>({ popover: 20 });

export function useZIndex() {
  return React.useContext(ZIndexContext);
}

export function SidebarZIndexProvider({ children }: { children: React.ReactNode }) {
  return (
    <ZIndexContext.Provider value={{ popover: 50 }}>
      {children}
    </ZIndexContext.Provider>
  );
}

export function ModalZIndexProvider({ children }: { children: React.ReactNode }) {
  return (
    <ZIndexContext.Provider value={{ popover: 10001 }}>
      {children}
    </ZIndexContext.Provider>
  );
}
