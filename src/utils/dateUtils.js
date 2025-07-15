import { format, isToday, isTomorrow, isYesterday, differenceInDays } from "date-fns";

export const formatDate = (date) => {
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return "Today";
  }
  
  if (isTomorrow(dateObj)) {
    return "Tomorrow";
  }
  
  if (isYesterday(dateObj)) {
    return "Yesterday";
  }
  
  return format(dateObj, "MMM dd, yyyy");
};

export const formatRelativeDate = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  const diff = differenceInDays(dateObj, today);
  
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1) return `In ${diff} days`;
  if (diff < -1) return `${Math.abs(diff)} days ago`;
  
  return format(dateObj, "MMM dd");
};

export const isOverdue = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  return dateObj < today;
};

export const getDaysUntilDue = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  return differenceInDays(dateObj, today);
};