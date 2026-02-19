import { type Task } from "../types/todo";

export type TodoState = {
  tasks: Task[];
  isLoading: boolean;
  isEditing: Task | null;
};

export const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  isEditing: null,
};

export type TodoAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "FETCH_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "DELETE_ALL_TASKS" }
  | { type: "SELECT_TASK_TO_EDIT"; payload: Task }
  | { type: "EDIT_TASK"; payload: { taskId: string; taskTitle: string } }
  | { type: "TOGGLE_TASK_COMPLETED"; payload: string };

export const todoReducer = (
  state: TodoState,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "FETCH_TASKS":
      return { ...state, tasks: action.payload, isLoading: false };

    case "ADD_TASK": {
      const tasks = [...state.tasks, action.payload];
      localStorage.setItem("todo-list", JSON.stringify(tasks));
      return { ...state, tasks };
    }

    case "DELETE_TASK": {
      const tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload,
      );
      localStorage.setItem("todo-list", JSON.stringify(tasks));
      return { ...state, tasks };
    }

    case "DELETE_ALL_TASKS":
      localStorage.removeItem("todo-list");
      return { ...state, tasks: [] };

    case "SELECT_TASK_TO_EDIT":
      return { ...state, isEditing: action.payload };

    case "EDIT_TASK": {
      const tasks = state.tasks.map((task) =>
        task.taskId === action.payload.taskId
          ? { ...task, taskTitle: action.payload.taskTitle }
          : task,
      );
      localStorage.setItem("todo-list", JSON.stringify(tasks));
      return { ...state, tasks, isEditing: null };
    }

    case "TOGGLE_TASK_COMPLETED": {
      const tasks = state.tasks.map((task) =>
        task.taskId === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );
      localStorage.setItem("todo-list", JSON.stringify(tasks));
      return { ...state, tasks };
    }

    default:
      return state;
  }
};
