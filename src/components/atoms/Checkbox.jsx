import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "checkbox-animation h-5 w-5 rounded border-2 border-gray-300 text-purple-900 focus:ring-purple-500 focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-out",
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;