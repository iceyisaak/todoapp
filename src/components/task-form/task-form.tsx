import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useTodoContext } from '../../contexts/todo-context'

import style from './task-form.module.scss'

const TaskForm = () => {

    const [text, setText] = useState("")
    const inputRef = useRef<HTMLInputElement>(null!)

    const {
        addTask,
        editTask,
        isEditing,
    } = useTodoContext()


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        // if (!taskToEdit?.isEditing) {
        if (isEditing !== null) {
            editTask(isEditing.taskId, text)
            setText('')
        } else {
            addTask(text)
            setText('')
        }

    }


    useEffect(() => {
        if (isEditing !== null) {
            setText(isEditing.taskTitle)
            inputRef.current.focus()
        } else {
            setText("")
        }
    }, [isEditing])


    return (
        <form onSubmit={onSubmitHandler} className={`${style['form']}`}>
            <input
                type="text"
                onChange={onChangeHandler}
                placeholder='e.g. Shopping'
                value={text}
                required
                className={`${style['input']}`}
                maxLength={25}
                ref={inputRef}
            />
            <button className={`${style['btn']}`}>
                <MdOutlineAddCircleOutline className={`${style['btn-text']} ${'pointer'}`} />
            </button>
        </form>
    )
}

export default TaskForm