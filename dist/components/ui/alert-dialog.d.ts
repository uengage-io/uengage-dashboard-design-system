import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { AlertDialog as AlertDialog$1 } from 'radix-ui';
import { Button } from './button.js';
import 'class-variance-authority/types';
import 'class-variance-authority';

declare function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialog$1.Root>): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialog$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialog$1.Portal>): react_jsx_runtime.JSX.Element;
declare function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Overlay>): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, size, overlayProps, ...props }: React.ComponentProps<typeof AlertDialog$1.Content> & {
    size?: "default" | "sm";
    overlayProps?: React.ComponentProps<typeof AlertDialog$1.Overlay>;
}): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialog$1.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, variant, size, ...props }: React.ComponentProps<typeof AlertDialog$1.Action> & Pick<React.ComponentProps<typeof Button>, "variant" | "size">): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, variant, size, ...props }: React.ComponentProps<typeof AlertDialog$1.Cancel> & Pick<React.ComponentProps<typeof Button>, "variant" | "size">): react_jsx_runtime.JSX.Element;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
