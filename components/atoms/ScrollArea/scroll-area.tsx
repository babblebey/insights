import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import clsx from "clsx";

const ScrollArea = ScrollAreaPrimitive.Root;

const ScrollViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <>
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      className={clsx(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </>
));
ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    className={clsx(
      "flex touch-none select-none transition-colors duration-[160ms] ease-out",
      orientation === "vertical" &&
        "h-full w-1.5 border-l border-l-transparent",
      className
    )}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="relative bg-light-slate-5 flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

export { ScrollArea, ScrollViewport, ScrollBar };