import { useAtomValue, useSetAtom } from "jotai";
import { tasksAtom } from "../../features/todo-feature/todo-initialstate";
import { deleteAllTasksAtom } from "../../features/todo-feature/todo-store";

import AppHeader from "../app-header";
import TaskForm from "../task-form";
import TaskList from "../task-list";

import { MdOutlineClose } from "react-icons/md";
import style from "./app.module.scss";

const App = () => {
  const tasks = useAtomValue(tasksAtom);
  const deleteAllTasks = useSetAtom(deleteAllTasksAtom);

  const deleteAllTasksHandler = () => {
    if (confirm("Delete All Tasks?")) deleteAllTasks();
  };

  return (
    <div className={style["container"]}>
      <main className={style["main"]}>
        {tasks.length > 0 && (
          <MdOutlineClose
            title="Delete All Tasks"
            onClick={deleteAllTasksHandler}
            className={`pointer ${style["btn-delete-all"]}`}
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
