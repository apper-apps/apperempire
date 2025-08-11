import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    active: true,
    href: "/"
  },
  {
    id: "tasks",
    label: "All Tasks",
    icon: "CheckSquare",
    active: false,
    href: "/tasks"
  },
  {
    id: "categories",
    label: "Categories",
    icon: "Tag",
    active: false,
    href: "/categories"
  },
  {
    id: "completed",
    label: "Completed",
    icon: "Check",
    active: false,
    href: "/completed"
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    active: false,
    href: "/settings"
  }
];

function Sidebar({ isOpen, onClose, onCategoryClick, className }) {
  const handleMenuClick = (item) => {
    if (item.id === "categories") {
      onCategoryClick?.();
    }
    // For now, keep dashboard active since it's the only functional page
    console.log(`Navigate to ${item.label}`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white z-50",
          "w-64 border-r border-gray-200 shadow-lg",
          "lg:relative lg:translate-x-0 lg:opacity-100 lg:shadow-none",
          "flex flex-col",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 geometric-card flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-display">
              TaskFlow
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-2"
          >
            <ApperIcon name="X" size={18} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Navigation
            </div>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={item.active ? "default" : "ghost"}
                size="sm"
                onClick={() => handleMenuClick(item)}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  "geometric-button transition-all duration-200",
                  item.active 
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <ApperIcon 
                  name={item.icon} 
                  size={18} 
                  className={cn(
                    "mr-3",
                    item.active ? "text-white" : "text-gray-500"
                  )} 
                />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 geometric-card bg-gradient-to-br from-purple-50 to-purple-100">
            <h3 className="text-sm font-semibold text-purple-900 mb-3">
              Quick Stats
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Active Tasks</span>
                <span className="font-medium text-purple-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Completed</span>
                <span className="font-medium text-purple-900">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Categories</span>
                <span className="font-medium text-purple-900">5</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            TaskFlow v1.0
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;