import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { v4 as uuidV4 } from "uuid";
import {
  addTask,
  editTask,
  setIsEditingDone,
  useTaskStore,
} from "../../features/todo-feature/store";
import style from "./task-form.module.scss";

const TaskForm = () => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);

  const { isEditing } = useTaskStore();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing === null) {
      addTask({ taskId: uuidV4(), taskTitle: text, isCompleted: false });
    } else {
      editTask(isEditing.taskId, text);
      setIsEditingDone();
    }
    setText("");
  };

  useEffect(() => {
    if (isEditing !== null) {
      setText(isEditing.taskTitle);
      inputRef.current.focus();
    } else {
      setText("");
    }
  }, [isEditing]);

  return (
    <form onSubmit={onSubmitHandler} className={style["form"]}>
      <input
        type="text"
        onChange={onChangeHandler}
        placeholder="e.g. Shopping"
        value={text}
        required
        className={style["input"]}
        maxLength={25}
        ref={inputRef}
      />
      <button className={style["btn"]}>
        <MdOutlineAddCircleOutline className={`${style["btn-text"]} pointer`} />
      </button>
    </form>
  );
};

export default TaskForm;
