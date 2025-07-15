import { cn } from "@/utils/cn";

const CategoryPill = ({ category, className }) => {
  if (!category) return null;

  return (
    <span
      className={cn(
        "category-pill",
        className
      )}
      style={{ 
        backgroundColor: category.color + "20",
        color: category.color,
        border: `1px solid ${category.color}30`
      }}
    >
      {category.name}
    </span>
  );
};

export default CategoryPill;