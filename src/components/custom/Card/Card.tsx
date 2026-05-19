import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription,
  CardAction,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter,
} from "../../ui/card";

export interface CardProps extends React.ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  return (
    <ShadcnCard
      className={cn(
        "border-gray-300 bg-white p-3 sm:p-4 md:p-5 text-sm text-[#202020] shadow-none",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ShadcnCardHeader className={cn("text-[#202020]", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ShadcnCardTitle className={cn("text-[#202020]", className)} {...props} />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ShadcnCardContent className={cn("text-[#202020]", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ShadcnCardFooter className={cn("text-[#202020]", className)} {...props} />
  );
}

Card.displayName = "Card";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
