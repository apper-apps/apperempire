import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "form-input w-full px-4 py-2 text-sm bg-white border-2 border-gray-300 focus:border-purple-900 focus:outline-none focus:ring-3 focus:ring-purple-100 transition-all duration-150 ease-out resize-none",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;