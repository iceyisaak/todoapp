import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { v4 as uuidV4 } from 'uuid'

import style from './task-form.module.scss'
import { useTaskStore } from '../../features/todo-feature/todo-store'

const TaskForm = () => {

    const [text, setText] = useState("")
    const inputRef = useRef<HTMLInputElement>(null!)
    const { addTask, isEditing, editTask } = useTaskStore(
        (state) => ({
            addTask: state.addTask,
            // isEditing: state.isEditing,
            // editTask: state.editTask
        }))


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
        addTask({
            taskId: uuidV4(),
            taskTitle: text,
            isCompleted: false
        })

        setText('')

        // if (isEditing !== null) {
        //     editTask(isEditing.taskId, text)
        //     setText('')
        // } else {
        //     addTask(text)
        //     setText('')
        // }

    }


    // useEffect(() => {
    //     if (isEditing !== null) {
    //         setText(isEditing.taskTitle)
    //         inputRef.current.focus()
    //     } else {
    //         setText("")
    //     }
    // }, [isEditing])


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