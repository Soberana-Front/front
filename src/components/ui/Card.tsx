import * as React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove o padding interno de CardHeader e CardContent */
  noPadding?: boolean;
  /** Variante de estilo do card */
  variant?: "default" | "bordered" | "shadow" | "none";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, noPadding = false, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white border border-gray-200 shadow-sm",
      bordered: "bg-white border border-gray-300",
      shadow: "bg-white shadow-lg",
      none: "bg-transparent border-0 shadow-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          variantClasses[variant],
          noPadding && "p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      !noPadding && "p-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      !noPadding && "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };