import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Dialog } from 'radix-ui';

declare function Drawer({ ...props }: React.ComponentProps<typeof Dialog.Root>): react_jsx_runtime.JSX.Element;
declare function DrawerTrigger({ ...props }: React.ComponentProps<typeof Dialog.Trigger>): react_jsx_runtime.JSX.Element;
declare function DrawerPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>): react_jsx_runtime.JSX.Element;
declare function DrawerClose({ ...props }: React.ComponentProps<typeof Dialog.Close>): react_jsx_runtime.JSX.Element;
declare function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof Dialog.Overlay>): react_jsx_runtime.JSX.Element;
declare function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof Dialog.Content>): react_jsx_runtime.JSX.Element;
declare function DrawerTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>): react_jsx_runtime.JSX.Element;
declare function DrawerDescription({ className, ...props }: React.ComponentProps<typeof Dialog.Description>): react_jsx_runtime.JSX.Element;

export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger };
