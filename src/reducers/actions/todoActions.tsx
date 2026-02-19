import { type Task } from "../../types/todo";

export type TodoAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "FETCH_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "DELETE_ALL_TASKS" }
  | { type: "SELECT_TASK_TO_EDIT"; payload: Task }
  | { type: "EDIT_TASK"; payload: { taskId: string; taskTitle: string } }
  | { type: "TOGGLE_TASK_COMPLETED"; payload: string };
