// Importa React e utilitário
import * as React from "react";
import { cn } from "../../utils/cn";

// Props do Card com opções de padding e variantes
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  variant?: "default" | "bordered" | "shadow" | "none";
}

// Componente Card com variações de estilo
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, noPadding = false, variant = "default", ...props }, ref) => {
    const variantClass = {
      default: "card-variant-default",
      bordered: "card-variant-bordered",
      shadow: "card-variant-shadow",
      none: "card-variant-none",
    }[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "card",
          variantClass,
          noPadding && "card-no-padding",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// Cabeçalho do Card com padding opcional
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-header",
      !noPadding && "card-header-padding",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Título do Card
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("card-title", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Conteúdo do Card com padding opcional
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-content",
      !noPadding && "card-content-padding",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// Exporta todos os subcomponentes
export { Card, CardHeader, CardTitle, CardContent };