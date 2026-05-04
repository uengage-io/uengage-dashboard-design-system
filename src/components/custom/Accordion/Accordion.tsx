import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Accordion as AccordionNS } from "radix-ui";
import { cn } from "@/lib/utils";
import type { CustomAccordionProps } from "./Accordion.types";
import {
  accordionRootVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from "./accordionVariants";

function AccordionItems({
  items,
  variant,
  size,
}: Pick<CustomAccordionProps, "items" | "variant" | "size">) {
  return (
    <>
      {items.map((item) => (
        <AccordionNS.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={accordionItemVariants({ variant })}
        >
          <AccordionNS.Header className="flex">
            <AccordionNS.Trigger
              className={cn(
                accordionTriggerVariants({ variant, size }),
                "data-[state=open]:text-[#006F42] w-full justify-between",
              )}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                {item.icon && (
                  <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                )}
                <span className="truncate text-left">{item.title}</span>
              </span>
              <ChevronDown
                className="ml-3 size-4 shrink-0 text-[#9CA3AF] transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionNS.Trigger>
          </AccordionNS.Header>
          <AccordionNS.Content className="overflow-hidden will-change-[height] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className={accordionContentVariants({ variant, size })}>
              {item.content}
            </div>
          </AccordionNS.Content>
        </AccordionNS.Item>
      ))}
    </>
  );
}

export function Accordion(props: CustomAccordionProps) {
  const { items, variant = "default", size = "md", className } = props;

  const rootClass = cn(accordionRootVariants({ variant }), className);

  if (props.type === "multiple") {
    return (
      <AccordionNS.Root
        type="multiple"
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onChange}
        className={rootClass}
      >
        <AccordionItems items={items} variant={variant} size={size} />
      </AccordionNS.Root>
    );
  }

  return (
    <AccordionNS.Root
      type="single"
      collapsible={props.collapsible ?? true}
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onChange}
      className={rootClass}
    >
      <AccordionItems items={items} variant={variant} size={size} />
    </AccordionNS.Root>
  );
}

Accordion.displayName = "Accordion";
