import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import CategoryPill from "@/components/molecules/CategoryPill";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onDelete, 
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(task.Id);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.Id);
    } finally {
      setIsDeleting(false);
    }
  };

  const isOverdue = () => {
    if (task.completed) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDueDate = () => {
    const daysUntil = getDaysUntilDue();
    if (daysUntil === 0) return "Due today";
    if (daysUntil === 1) return "Due tomorrow";
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    return `Due in ${daysUntil} days`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "geometric-card bg-white p-6 transition-all duration-200 ease-out",
        task.completed && "task-complete-animation",
        isOverdue() && "border-l-4 border-red-500",
        className
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isCompleting}
            className="scale-110"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 font-display",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 ml-4">
              <PriorityBadge priority={task.priority} />
              <CategoryPill category={category} />
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-gray-600 mb-3 text-sm",
              task.completed && "line-through text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className={cn(
                "flex items-center space-x-1",
                isOverdue() && !task.completed && "text-red-600 font-medium",
                task.completed && "text-gray-400"
              )}>
                <ApperIcon name="Calendar" size={16} />
                <span>{formatDueDate()}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-500">
                <ApperIcon name="Clock" size={16} />
                <span>{format(new Date(task.createdAt), "MMM dd")}</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isDeleting ? (
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <ApperIcon name="Trash2" size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;