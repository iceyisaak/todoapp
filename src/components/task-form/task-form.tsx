import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../reducers/store";
import { addTask, editTask } from "../../reducers/todoSlice";
import style from "./task-form.module.scss";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.todo.isEditing);

  const inputRef = useRef<HTMLInputElement>(null!);
  const [text, setText] = useState("");

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing === null) {
      dispatch(addTask(text));
    } else {
      dispatch(editTask({ taskId: isEditing.taskId, taskTitle: text }));
    }
    setText("");
  };

  useEffect(() => {
    if (isEditing) {
      setText(isEditing.taskTitle);
      inputRef.current.focus();
    } else {
      setText("");
    }
  }, [isEditing]);

  return (
    <form onSubmit={onSubmitHandler} className={style["form"]}>
      <input
        ref={inputRef}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="e.g. Shopping"
        value={text}
        required
        className={style["input"]}
        maxLength={25}
      />
      <button className={style["btn"]}>
        <MdOutlineAddCircleOutline className={`${style["btn-text"]} pointer`} />
      </button>
    </form>
  );
};

export default TaskForm;
