import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

import { useAppDispatch } from "../../../reducers/store";
import {
  deleteTask,
  selectTaskToEdit,
  toggleTaskAsCompleted,
} from "../../../reducers/todoSlice";
import { type Task } from "../../../types/todo";
import style from "./task-item.module.scss";

type TaskItemProps = { data: Task };

const TaskItem = ({ data }: TaskItemProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(data.taskId));
    }
  };

  return (
    <li className={style["TaskItem"]}>
      <input
        type="checkbox"
        onChange={() => dispatch(toggleTaskAsCompleted(data.taskId))}
        checked={data.isCompleted}
        className={style["checkbox"]}
      />
      <span
        className={`${style["task-name"]} ${
          data.isCompleted ? style["isCompleted"] : ""
        }`}
      >
        {data.taskTitle}
      </span>
      <MdOutlineEdit
        onClick={() => dispatch(selectTaskToEdit(data))}
        className={`pointer ${style["item-btn"]}`}
      />
      <MdOutlineDelete
        onClick={handleDelete}
        className={`pointer ${style["item-btn"]}`}
      />
    </li>
  );
};

export default TaskItem;
