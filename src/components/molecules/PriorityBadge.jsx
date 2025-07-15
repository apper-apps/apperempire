import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, className }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
        getPriorityStyles(priority),
        className
      )}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;