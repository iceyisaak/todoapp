import { useTodoContext } from "../../contexts/todo-context";
import TaskItem from "./task-item";

import style from "./task-list.module.scss";

const TaskList = () => {
  const { tasks, isLoading } = useTodoContext();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={`${style["TaskList"]}`}>
      {tasks.length < 1 && (
        <p className={`${style["no-task"]}`}>+++ Task List is Empty +++</p>
      )}
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.taskId} data={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
