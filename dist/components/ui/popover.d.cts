import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Popover as Popover$1 } from 'radix-ui';

declare function Popover({ ...props }: React.ComponentProps<typeof Popover$1.Root>): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof Popover$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, style, ...props }: React.ComponentProps<typeof Popover$1.Content>): react_jsx_runtime.JSX.Element;

export { Popover, PopoverContent, PopoverTrigger };
