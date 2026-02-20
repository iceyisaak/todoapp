import { MdOutlineClose } from "react-icons/md";

import AppHeader from "../app-header";
import TaskForm from "../task-form";
import TaskList from "../task-list";

import { useAppSelector } from "../../reducers/store";
import {
  useDeleteAllTasksMutation,
  useGetTasksQuery,
} from "../../reducers/todoApi";
import style from "./app.module.scss";

const App = () => {
  const { data: tasks = [] } = useGetTasksQuery();
  const [deleteAllTasks] = useDeleteAllTasksMutation();
  const isEditing = useAppSelector((state) => state.todo.isEditing);

  const handleDeleteAll = () => {
    if (window.confirm("Delete All Tasks?")) {
      deleteAllTasks(tasks);
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
