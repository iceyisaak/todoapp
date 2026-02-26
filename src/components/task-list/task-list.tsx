import { useAtom } from "jotai";
import { tasksSplitAtom } from "../../features/todo-feature/todo-initialstate";
import TaskItem from "./task-item";

import style from "./task-list.module.scss";

const TaskList = () => {
  const [tasks] = useAtom(tasksSplitAtom);

  return (
    <div className={`${style["TaskList"]}`}>
      <ul>
        {tasks.length < 1 ? (
          <p className={`${style["no-task"]}`}>+++ Task List is Empty +++</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.toString()} atom={task} />)
        )}
      </ul>
    </div>
  );
};

export default TaskList;
