import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStore } from "../../types";

const taskStore: TaskStore = {
  tasks: [],
  isEditing: null,
  isLoading: false,
};

export const useTaskStore = create<TaskStore>()(
  persist(() => taskStore, { name: "task-store" }),
);

export const addTask = (task: Task) =>
  useTaskStore.setState((state) => ({ tasks: [...state.tasks, task] }));

export const deleteTask = (id: string) =>
  useTaskStore.setState((state) => ({
    tasks: state.tasks.filter((task) => task.taskId !== id),
  }));

export const deleteAllTasks = () => useTaskStore.setState({ tasks: [] });

export const toggleTaskAsCompleted = (id: string) =>
  useTaskStore.setState((state) => ({
    tasks: state.tasks.map((task) =>
      task.taskId === id ? { ...task, isCompleted: !task.isCompleted } : task,
    ),
  }));

export const selectTaskToEdit = (task: Task) =>
  useTaskStore.setState({ isEditing: task });

export const editTask = (taskId: string, taskTitle: string) =>
  useTaskStore.setState((state) => ({
    tasks: state.tasks.map((task) =>
      task.taskId === taskId ? { ...task, taskTitle } : task,
    ),
  }));

export const setIsEditingDone = () =>
  useTaskStore.setState({ isEditing: null });

export const setIsLoading = (action: boolean) =>
  useTaskStore.setState({ isLoading: action });
