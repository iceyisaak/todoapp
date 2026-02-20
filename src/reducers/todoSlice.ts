import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuidv7 } from "uuidv7";
import { type Task, type TodoState } from "../types/todo";

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isEditing: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    fetchTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
      state.isLoading = false;
    },

    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.tasks.push(action.payload);
        localStorage.setItem("todo-list", JSON.stringify(state.tasks));
      },
      prepare(taskTitle: string) {
        return {
          payload: { taskId: uuidv7(), taskTitle, isCompleted: false },
        };
      },
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.taskId !== action.payload);
      localStorage.setItem("todo-list", JSON.stringify(state.tasks));
    },

    deleteAllTasks(state) {
      state.tasks = [];
      localStorage.removeItem("todo-list");
    },

    selectTaskToEdit(state, action: PayloadAction<Task>) {
      state.isEditing = action.payload;
    },

    editTask(
      state,
      action: PayloadAction<{ taskId: string; taskTitle: string }>,
    ) {
      const task = state.tasks.find((t) => t.taskId === action.payload.taskId);
      if (task) task.taskTitle = action.payload.taskTitle;
      state.isEditing = null;
      localStorage.setItem("todo-list", JSON.stringify(state.tasks));
    },

    toggleTaskAsCompleted(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.taskId === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
      localStorage.setItem("todo-list", JSON.stringify(state.tasks));
    },
  },
});

export const {
  setLoading,
  fetchTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  selectTaskToEdit,
  editTask,
  toggleTaskAsCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
