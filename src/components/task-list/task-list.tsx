import { useGetTasksQuery } from "../../reducers/todoApi";
import TaskItem from "./task-item";
import style from "./task-list.module.scss";

const TaskList = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  return (
    <ul className={style["TaskList"]}>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <p className={style["no-task"]}>⚠ Failed to load tasks.</p>
      ) : tasks.length < 1 ? (
        <p className={style["no-task"]}>+++ Task List is Empty +++</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.taskId} data={task} />)
      )}
    </ul>
  );
};

export default TaskList;
