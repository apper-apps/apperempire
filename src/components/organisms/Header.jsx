import { motion } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import ProgressRing from "@/components/molecules/ProgressRing";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
const Header = ({ onAddTask, onToggleSidebar, className }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    completedToday: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [allTasks, completedToday] = await Promise.all([
        taskService.getAll(),
        taskService.getCompletedToday()
      ]);
      
      const total = allTasks.length;
      const completed = allTasks.filter(task => task.completed).length;
      const active = total - completed;
      
      setStats({
        total,
        completed,
        active,
        completedToday: completedToday.length
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
<motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 text-white p-6 shadow-lg relative z-50",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={24} className="text-amber-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Apper</h1>
              <p className="text-purple-200 text-sm">Task Management System</p>
            </div>
          </div>
          
          {!loading && (
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <ProgressRing 
                  progress={completionPercentage} 
                  size={56} 
                  strokeWidth={4} 
                />
                <div className="text-sm">
                  <div className="font-semibold">
                    {stats.completed} of {stats.total} tasks
                  </div>
                  <div className="text-purple-200">
                    {Math.round(completionPercentage)}% complete
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-amber-300">
                    {stats.active}
                  </div>
                  <div className="text-xs text-purple-200 uppercase tracking-wider">
                    Active
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold font-display text-green-300">
                    {stats.completedToday}
                  </div>
                  <div className="text-xs text-purple-200 uppercase tracking-wider">
                    Today
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
<Button
          onClick={onAddTask}
          variant="secondary"
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold shadow-lg rounded-full"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Add Task
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;