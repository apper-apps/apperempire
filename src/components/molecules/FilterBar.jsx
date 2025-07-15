import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  className 
}) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: "List" },
    { key: "active", label: "Active", icon: "Clock" },
    { key: "completed", label: "Completed", icon: "CheckCircle" }
  ];

  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "created", label: "Created" }
  ];

  return (
    <div className={cn("flex items-center justify-between p-4 bg-white shadow-sm", className)}>
      <div className="flex items-center space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={cn(
              "filter-button flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-150 ease-out",
              activeFilter === filter.key ? "active" : ""
            )}
          >
            <ApperIcon name={filter.icon} size={16} />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="form-input px-3 py-1 text-sm border-gray-300 focus:border-purple-900"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;