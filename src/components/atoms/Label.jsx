import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-semibold text-gray-700 mb-2",
        className
      )}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;