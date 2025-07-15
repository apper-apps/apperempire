export const sortTasks = (tasks, sortBy) => {
  const tasksCopy = [...tasks];
  
  switch (sortBy) {
    case "priority":
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return tasksCopy.sort((a, b) => {
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      
    case "created":
      return tasksCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
    case "dueDate":
    default:
      return tasksCopy.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
};

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "active":
      return tasks.filter(task => !task.completed);
    case "completed":
      return tasks.filter(task => task.completed);
    case "all":
    default:
      return tasks;
  }
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  
  const today = new Date().toISOString().split('T')[0];
  const completedToday = tasks.filter(task => 
    task.completed && 
    task.completedAt && 
    task.completedAt.startsWith(today)
  ).length;
  
  return {
    total,
    completed,
    active,
    completedToday,
    completionRate: total > 0 ? (completed / total) * 100 : 0
  };
};

export const getTasksByPriority = (tasks, priority) => {
  return tasks.filter(task => task.priority === priority);
};

export const getOverdueTasks = (tasks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.filter(task => {
    if (task.completed) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  });
};