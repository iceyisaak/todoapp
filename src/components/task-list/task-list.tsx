import { useTodoContext } from "../../reducers/stores/todoStore";
import TaskItem from "./task-item";

import style from "./task-list.module.scss";

const TaskList = () => {
  const { tasks, isLoading } = useTodoContext();

  return (
    <ul className={`${style["TaskList"]}`}>
      {isLoading ? (
        "Loading..."
      ) : tasks.length < 1 ? (
        <p className={`${style["no-task"]}`}>+++ Task List is Empty +++</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.taskId} data={task} />)
      )}
    </ul>
  );
};

export default TaskList;
