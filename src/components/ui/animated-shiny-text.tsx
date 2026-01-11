import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "relative inline-block group",
        // Base text that's always visible
        "text-neutral-600/70 dark:text-neutral-400/70",
        "transition-colors duration-300",
        "hover:text-neutral-900 dark:hover:text-neutral-100",
        // Make it look clickable
        "cursor-pointer",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      {...props}
    >
      {/* Base text */}
      <span className="relative z-10">{children}</span>
      {/* Animated shine overlay */}
      <span
        className={cn(
          "absolute inset-0",
          "animate-shiny-text [background-size:var(--shiny-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat",
          "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
          "text-transparent pointer-events-none",
          // Hover: make shine more prominent
          "group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-black group-hover:via-50% group-hover:to-transparent",
          "dark:group-hover:via-white",
          "group-hover:animate-shiny-text"
        )}
        style={
          {
            "--shiny-width": `${shimmerWidth}px`,
          } as CSSProperties
        }
    >
      {children}
      </span>
    </span>
  )
}
