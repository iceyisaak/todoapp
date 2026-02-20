import {
  ChangeEvent,
  SubmitEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../reducers/store";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "../../reducers/todoApi";
import { clearEditing } from "../../reducers/todoSlice";
import style from "./task-form.module.scss";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.todo.isEditing);

  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [editTask, { isLoading: isUpdating }] = useEditTaskMutation();

  const inputRef = useRef<HTMLInputElement>(null!);
  const [text, setText] = useState("");

  const onSubmitHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isEditing === null) {
      await addTask(text);
    } else {
      await editTask({ taskId: isEditing.taskId, taskTitle: text });
      dispatch(clearEditing());
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

  const isBusy = isAdding || isUpdating;

  return (
    <form onSubmit={onSubmitHandler} className={style["form"]}>
      <input
        ref={inputRef}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="e.g. Shopping"
        value={text}
        required
        disabled={isBusy}
        className={style["input"]}
        maxLength={25}
      />
      <button className={style["btn"]} disabled={isBusy}>
        <MdOutlineAddCircleOutline className={`${style["btn-text"]} pointer`} />
      </button>
    </form>
  );
};

export default TaskForm;
