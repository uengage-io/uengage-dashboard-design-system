import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Accordion as Accordion$1 } from 'radix-ui';

declare function Accordion({ ...props }: React.ComponentProps<typeof Accordion$1.Root>): react_jsx_runtime.JSX.Element;
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof Accordion$1.Item>): react_jsx_runtime.JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Accordion$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof Accordion$1.Content>): react_jsx_runtime.JSX.Element;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
