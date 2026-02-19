import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { uuidv7 } from "uuidv7";

import { type Task, type TodoContext } from "../../types/todo";
import { initialState, todoReducer } from "../todoReducer";

const TodoContext = createContext<TodoContext>(null!);

const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const savedTasks = localStorage.getItem("todo-list");
    if (savedTasks) {
      dispatch({ type: "FETCH_TASKS", payload: JSON.parse(savedTasks) });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const addTask = (taskTitle: string) => {
    dispatch({
      type: "ADD_TASK",
      payload: { taskId: uuidv7(), taskTitle, isCompleted: false },
    });
  };

  const deleteTask = (taskId: string) => {
    const confirmed = window.confirm("Delete this task?");
    if (confirmed) {
      dispatch({ type: "DELETE_TASK", payload: taskId });
    }
  };

  const deleteAllTasks = () => {
    const confirmed = window.confirm("Delete All Tasks?");
    if (confirmed) {
      dispatch({ type: "DELETE_ALL_TASKS" });
    }
  };

  const selectTaskToEdit = (task: Task) => {
    dispatch({ type: "SELECT_TASK_TO_EDIT", payload: task });
  };

  const editTask = (taskId: string, taskTitle: string) => {
    dispatch({ type: "EDIT_TASK", payload: { taskId, taskTitle } });
  };

  const toggleTaskAsCompleted = (taskId: string) => {
    dispatch({ type: "TOGGLE_TASK_COMPLETED", payload: taskId });
  };

  const TodoContextValue: TodoContext = {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isEditing: state.isEditing,
    addTask,
    deleteTask,
    deleteAllTasks,
    selectTaskToEdit,
    editTask,
    toggleTaskAsCompleted,
  };

  return (
    <TodoContext.Provider value={TodoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export { TodoContext, TodoContextProvider };
