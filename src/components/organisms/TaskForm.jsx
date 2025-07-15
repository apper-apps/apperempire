import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import { cn } from "@/utils/cn";

const TaskForm = ({ onTaskCreated, className }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    categoryId: ""
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: data[0].Id.toString() }));
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const taskData = {
        ...formData,
        categoryId: formData.categoryId
      };
      
      await taskService.create(taskData);
      
      toast.success("Task created successfully!");
      
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        categoryId: categories.length > 0 ? categories[0].Id.toString() : ""
      });
      
      setErrors({});
      onTaskCreated?.();
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (categoriesLoading) {
    return (
      <div className={cn("geometric-card bg-white p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("geometric-card bg-white p-6", className)}
    >
      <div className="flex items-center mb-6">
        <ApperIcon name="Plus" size={24} className="text-purple-900 mr-3" />
        <h2 className="text-xl font-bold text-gray-900 font-display">
          Create New Task
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter task title..."
          error={errors.title}
          required
        />
        
        <FormField
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Add task description..."
          rows={3}
          error={errors.description}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            error={errors.dueDate}
            required
          />
          
          <FormField
            label="Priority"
            error={errors.priority}
            required
          >
            <Select
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>
        </div>
        
        <FormField
          label="Category"
          error={errors.categoryId}
          required
        >
          <Select
            value={formData.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.Id} value={category.Id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormField>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
              Creating Task...
            </>
          ) : (
            <>
              <ApperIcon name="Plus" size={20} className="mr-2" />
              Create Task
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default TaskForm;