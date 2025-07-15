import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "form-input w-full px-4 py-2 text-sm bg-white border-2 border-gray-300 focus:border-purple-900 focus:outline-none focus:ring-3 focus:ring-purple-100 transition-all duration-150 ease-out",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;