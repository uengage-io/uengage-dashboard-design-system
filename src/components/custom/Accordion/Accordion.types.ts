import type * as React from "react";

export interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type AccordionVariant = "default" | "ghost" | "bordered";
export type AccordionSize = "sm" | "md" | "lg";

interface AccordionBaseProps {
  items: AccordionItem[];
  variant?: AccordionVariant;
  size?: AccordionSize;
  className?: string;
}

interface AccordionSingleProps extends AccordionBaseProps {
  type?: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface AccordionMultipleProps extends AccordionBaseProps {
  type: "multiple";
  collapsible?: never;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type   CustomAccordionProps = AccordionSingleProps | AccordionMultipleProps;
