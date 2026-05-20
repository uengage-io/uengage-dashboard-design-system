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
import { GridContext } from "../Grid/Grid";

export interface CardProps extends React.ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  const { inStrip } = React.useContext(GridContext);
  return (
    <ShadcnCard
      className={cn(
        "text-sm text-[#202020] shadow-none",
        inStrip
          ? "h-full w-full rounded-none border-0 bg-transparent px-0 py-3 sm:px-1 sm:py-1 md:px-0 md:py-5"
          : "border-gray-300 bg-white px-0 py-3 sm:px-1 sm:py-1 md:px-0 md:py-5",
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
