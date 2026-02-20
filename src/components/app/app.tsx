import { useTodoContext } from "../../contexts/todo-context";
import TaskForm from "../task-form";
import TaskList from "../task-list";

import { MdOutlineClose } from "react-icons/md";

import style from "./app.module.scss";

const App = () => {
  const { deleteAllTasks, tasks } = useTodoContext();

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
        <header className={`${style["header"]}`}>
          <h1 className={`${style["h1"]}`}>TodoApp</h1>
          <h4 className={`${style["h4"]}`}>React Context API</h4>
        </header>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default App;
