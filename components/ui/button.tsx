"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-signal text-ink-950 hover:bg-signal-dim shadow-glow font-semibold",
  secondary:
    "bg-pulse text-white hover:bg-pulse-dim shadow-glow-violet font-semibold",
  ghost: "bg-transparent text-paper hover:bg-ink-800",
  outline: "bg-transparent border border-ink-600 text-paper hover:border-signal/60 hover:bg-ink-900",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2 rounded-lg",
  md: "text-[15px] px-5 py-3 rounded-xl",
  lg: "text-base px-7 py-4 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
