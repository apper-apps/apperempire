import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started!", 
  actionLabel = "Add Task",
  onAction,
  icon = "Plus",
  className 
}) => {
  return (
    <div className={cn("geometric-card bg-white p-12 text-center", className)}>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} size={40} className="text-purple-600" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 font-display">
            {title}
          </h3>
          <p className="text-gray-600 max-w-md">
            {description}
          </p>
        </div>
        
        {onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="mt-6"
          >
            <ApperIcon name={icon} size={20} className="mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;