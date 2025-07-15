import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import CategoryModal from "@/components/organisms/CategoryModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const taskFormRef = useRef(null);

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCategoryUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddTask = () => {
    taskFormRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddTask={handleAddTask} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div ref={taskFormRef}>
                <TaskForm onTaskCreated={handleTaskCreated} />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="geometric-card bg-white p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCategoryModal(true)}
                    className="w-full justify-start"
                  >
                    <ApperIcon name="Tag" size={16} className="mr-2" />
                    Manage Categories
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRefreshTrigger(prev => prev + 1)}
                    className="w-full justify-start"
                  >
                    <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                    Refresh Tasks
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TaskList 
                refreshTrigger={refreshTrigger}
                className="space-y-6"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCategoryUpdated={handleCategoryUpdated}
      />
    </div>
  );
};

export default TaskPage;