import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedTask = { ...tasks[index], ...updates };
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async toggleComplete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const task = tasks[index];
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async getCompletedToday() {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.completed && 
      task.completedAt && 
      task.completedAt.startsWith(today)
    );
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(task => task.categoryId === categoryId.toString());
  },

  async getByPriority(priority) {
    await delay(200);
    return tasks.filter(task => task.priority === priority);
  }
};