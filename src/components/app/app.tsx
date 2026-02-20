import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

import AppHeader from "../app-header";
import TaskForm from "../task-form";
import TaskList from "../task-list";

import { useAppDispatch, useAppSelector } from "../../reducers/store";
import {
  deleteAllTasks,
  fetchTasks,
  setLoading,
} from "../../reducers/todoSlice";
import style from "./app.module.scss";

const App = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.todo.tasks);

  useEffect(() => {
    dispatch(setLoading(true));
    const savedTasks = localStorage.getItem("todo-list");
    if (savedTasks) {
      dispatch(fetchTasks(JSON.parse(savedTasks)));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleDeleteAll = () => {
    if (window.confirm("Delete All Tasks?")) {
      dispatch(deleteAllTasks());
    }
  };

  return (
    <div className={style["container"]}>
      <main className={style["main"]}>
        {tasks.length > 0 && (
          <MdOutlineClose
            title="Delete All Tasks"
            onClick={handleDeleteAll}
            className={`pointer ${style["btn-delall"]} ${style["btn-delete-all"]}`}
          />
        )}
        <AppHeader />
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default App;
