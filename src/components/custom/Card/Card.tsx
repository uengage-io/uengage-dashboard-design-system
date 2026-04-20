import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../../ui/card";

export interface CardProps extends React.ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  return (
    <ShadcnCard
      className={cn(
        "border-gray-300 bg-white p-3 sm:p-4 md:p-5 text-sm text-[#6B7280] shadow-none",
        className,
      )}
      {...props}
    />
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
