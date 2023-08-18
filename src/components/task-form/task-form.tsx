import { ChangeEvent, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useTodoContext } from '../../contexts/todo-context'

import style from './task-form.module.scss'

const TaskForm = () => {

    const [text, setText] = useState<string>("")

    const {
        addTask,
        editTask,
        taskToEdit
    } = useTodoContext()


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (!taskToEdit.edit) {
            addTask(text)
            setText('')
        } else {
            editTask(text)
        }

    }


    useEffect(() => {
        if (taskToEdit.edit) {
            setText(taskToEdit.taskTitle)
        } else {
            setText("")
        }
    }, [taskToEdit])


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
            />
            <button className={`${style['btn']}`}>
                <MdOutlineAddCircleOutline className={`${style['btn-text']} ${'pointer'}`} />
            </button>
        </form>
    )
}

export default TaskForm