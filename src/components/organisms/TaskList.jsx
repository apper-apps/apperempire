import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/organisms/TaskCard";
import FilterBar from "@/components/molecules/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { cn } from "@/utils/cn";

const TaskList = ({ refreshTrigger, className }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task marked as active"
      );
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (activeFilter) {
      case "active":
        filtered = tasks.filter(task => !task.completed);
        break;
      case "completed":
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === parseInt(categoryId));
  };

  const filteredTasks = getFilteredTasks();

  if (loading) {
    return <Loading className={className} />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadData}
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      {filteredTasks.length === 0 ? (
        <Empty
          title={
            activeFilter === "completed" 
              ? "No completed tasks yet" 
              : activeFilter === "active"
              ? "No active tasks"
              : "No tasks yet"
          }
          description={
            activeFilter === "completed"
              ? "Complete some tasks to see them here!"
              : activeFilter === "active"
              ? "All tasks are completed. Great job!"
              : "Create your first task to get started!"
          }
          actionLabel="Add Task"
          icon={activeFilter === "completed" ? "CheckCircle" : "Plus"}
        />
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                category={getCategoryById(task.categoryId)}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;