import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";
import { cn } from "@/utils/cn";

const CategoryModal = ({ isOpen, onClose, onCategoryUpdated }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    color: "#5b21b6"
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    { value: "#5b21b6", label: "Purple" },
    { value: "#dc2626", label: "Red" },
    { value: "#059669", label: "Green" },
    { value: "#d97706", label: "Orange" },
    { value: "#0369a1", label: "Blue" },
    { value: "#7c2d12", label: "Brown" },
    { value: "#be185d", label: "Pink" },
    { value: "#374151", label: "Gray" }
  ];

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setErrors({ name: "Category name is required" });
      return;
    }
    
    try {
      setLoading(true);
      await categoryService.create(formData);
      
      toast.success("Category created successfully!");
      setFormData({ name: "", color: "#5b21b6" });
      setErrors({});
      await loadCategories();
      onCategoryUpdated?.();
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    
    try {
      await categoryService.delete(categoryId);
      toast.success("Category deleted successfully");
      await loadCategories();
      onCategoryUpdated?.();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-display">
                Manage Categories
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <FormField
                label="Category Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name..."
                error={errors.name}
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                      className={cn(
                        "w-12 h-12 rounded-lg border-2 transition-all duration-150 ease-out",
                        formData.color === option.value
                          ? "border-gray-900 scale-110"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: option.value }}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Plus" size={16} className="mr-2" />
                    Create Category
                  </>
                )}
              </Button>
            </form>
            
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Existing Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.Id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.Id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryModal;