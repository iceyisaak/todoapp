import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { Task, TaskStore } from "../../types/";

const taskStore: TaskStore = {
  tasks: [],
  isEditing: null,
  isLoading: false,
};

export const useTaskStore = create<typeof taskStore>()(
  subscribeWithSelector(persist(() => taskStore, { name: "task-store" })),
);

export const addTask = (task: Task) => {
  useTaskStore.setState((state) => ({
    tasks: [...state.tasks, task],
  }));
};

export const deleteTask = (id: string) => {
  useTaskStore.setState((state) => ({
    tasks: state.tasks.filter((task) => {
      return task.taskId !== id;
    }),
  }));
};

export const deleteAllTasks = () => {
  useTaskStore.setState(() => ({
    tasks: [],
  }));
};

export const toggleTaskAsCompleted = (id: string) => {
  useTaskStore.setState((state) => ({
    tasks: state.tasks.map((task) =>
      task.taskId === id ? { ...task, isCompleted: !task.isCompleted } : task,
    ),
  }));
};

export const selectTaskToEdit = (task: Task) => {
  useTaskStore.setState((state) => ({
    isEditing: (state.isEditing = {
      taskId: task.taskId,
      taskTitle: task.taskTitle,
      isCompleted: task.isCompleted,
    }),
  }));
};

export const editTask = (taskId: string, taskTitle: string) => {
  useTaskStore.setState((state) => ({
    tasks: state.tasks.map((task) =>
      task.taskId === taskId ? { ...task, taskTitle } : task,
    ),
  }));
};

export const setIsEditingDone = () => {
  useTaskStore.setState((state) => ({
    isEditing: (state.isEditing = null),
  }));
};

export const setIsLoading = (action: boolean) => {
  useTaskStore.setState((state) => ({
    isLoading: state.isLoading === action,
  }));
};
