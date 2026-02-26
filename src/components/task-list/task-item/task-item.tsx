import { PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import {
  deleteTaskAtom,
  selectTaskToEditAtom,
  toggleTaskAtom,
} from "../../../features/todo-feature/todo-store";

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { type Task } from "../../../types";
import style from "./task-item.module.scss";

type TaskItemProps = {
  atom: PrimitiveAtom<Task>;
};

const TaskItem = ({ atom }: TaskItemProps) => {
  const data = useAtomValue(atom);
  const deleteTask = useSetAtom(deleteTaskAtom);
  const toggleTask = useSetAtom(toggleTaskAtom);
  const selectTaskToEdit = useSetAtom(selectTaskToEditAtom);

  const handleDelete = () => {
    if (confirm("Delete this task?")) deleteTask(data.taskId);
  };

  return (
    <li className={style["TaskItem"]}>
      <input
        type="checkbox"
        checked={data.isCompleted}
        onChange={() => toggleTask(data.taskId)}
        className={style["checkbox"]}
      />
      <span
        className={`${style["task-name"]} ${data.isCompleted ? style["isCompleted"] : ""}`}
      >
        {data.taskTitle}
      </span>
      <MdOutlineEdit
        onClick={() => selectTaskToEdit(data)}
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
