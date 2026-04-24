"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

interface UengageProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function UengageProvider({ children, className }: UengageProviderProps) {
  return (
    <div className={cn("uengage-ui", className)}>
      {children}
    </div>
  );
}
