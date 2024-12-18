import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center  gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: " text-primary-foreground hover:bg-food-300/70",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-food-600 underline-offset-4 hover:underline text-md ",
        remove: "text-red-500 underline-offset-4 hover:underline text-md hover:text-red-400",
        add: "text-zinc-100 border border-brown-100 rounded-lg text-sm hover:border-brown-150 hover:bg-zinc-800",
        login:
          "text-zinc-100 hover:text-zinc-200 bg-food-300 border border-food-400 hover:border-food-600",
        logout: "text-zinc-700 hover:text-zinc-800  text-sm ",
        create:
          "text-zinc-100 bg-food-100 shadow-lg border border-food-300 hover:text-zinc-200 text-sm hover:border hover:border-food-600",
        delete: "text-red-500 hover:text-red-600 hover:underline text-sm ",
        modal: " hover:underline text-sm ",
        banner: " px-4 text-md text-brown-400 hover:shadow-lg hover:bg-brown-100 bg-brown-100 ",
        cart: "bg-zinc-200 hover:bg-zinc-300 shadow-md",
        quantity: "bg-zinc-800 hover:bg-zinc-900 px-2 py-1",
        none: "",
      },
      size: {
        default: "h-10 px-4 py-1",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
