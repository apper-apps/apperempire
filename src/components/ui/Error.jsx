import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className 
}) => {
  return (
    <div className={cn("geometric-card bg-white p-8 text-center", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="mt-4"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;