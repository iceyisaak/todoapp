import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useTodoContext } from "../../reducers/store/todoStore";
import style from "./task-form.module.scss";

const TaskForm = () => {
  const { addTask, editTask, isEditing, selectTaskToEdit } = useTodoContext();

  const inputRef = useRef<HTMLInputElement>(null!);
  const [text, setText] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (isEditing === null) {
      addTask(text);
    } else {
      editTask(isEditing.taskId, text);
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
    <form onSubmit={onSubmitHandler} className={`${style["form"]}`}>
      <input
        type="text"
        onChange={onChangeHandler}
        placeholder="e.g. Shopping"
        value={text}
        required
        className={`${style["input"]}`}
        maxLength={25}
        ref={inputRef}
      />
      <button className={`${style["btn"]}`}>
        <MdOutlineAddCircleOutline
          className={`${style["btn-text"]} ${"pointer"}`}
        />
      </button>
    </form>
  );
};

export default TaskForm;
