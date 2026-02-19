import AppHeader from "../app-header";
import TaskForm from "../task-form";
import TaskList from "../task-list";

import { MdOutlineClose } from "react-icons/md";
import { useTodoContext } from "../../reducers/stores/todoStore";
import style from "./app.module.scss";

const App = () => {
  const { tasks, deleteAllTasks } = useTodoContext();

  return (
    <div className={`${style["container"]}`}>
      <main className={`${style["main"]}`}>
        {tasks.length > 0 && (
          <MdOutlineClose
            title="Delete All Tasks"
            onClick={deleteAllTasks}
            className={`
              ${"pointer"}
              ${style["btn-delall"]}
              ${style["btn-delete-all"]}
            `}
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
