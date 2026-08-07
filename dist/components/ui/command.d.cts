import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Command as Command$1, CommandEmpty as CommandEmpty$1, CommandGroup as CommandGroup$1, CommandInput as CommandInput$1, CommandItem as CommandItem$1, CommandSeparator as CommandSeparator$1 } from 'cmdk';

declare function Command({ className, ...props }: React.ComponentProps<typeof Command$1>): react_jsx_runtime.JSX.Element;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandInput$1>): react_jsx_runtime.JSX.Element;
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandEmpty$1>): react_jsx_runtime.JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandGroup$1>): react_jsx_runtime.JSX.Element;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandItem$1>): react_jsx_runtime.JSX.Element;
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandSeparator$1>): react_jsx_runtime.JSX.Element;

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator };
