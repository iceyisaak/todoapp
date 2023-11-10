import { useAtom, useSetAtom } from 'jotai'
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { useAddTask, useEditTask } from '../../api/tasks-api'
import { isEditingAtom, newTaskAtom } from '../../features/todo-feature/todo-initialstate'

import { MdOutlineAddCircleOutline } from 'react-icons/md'
import style from './task-form.module.scss'



const TaskForm = () => {

    const { mutate: addTask } = useAddTask()
    const { mutate: editTask } = useEditTask()

    const inputRef = useRef<HTMLInputElement>(null!)
    const [isEditing, setIsEditing] = useAtom(isEditingAtom)
    const [text, setText] = useAtom(newTaskAtom)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        if (isEditing === null) {
            addTask(text)
            setText('')
        } else if (isEditing !== null) {
            editTask({ isEditing, text })
            setIsEditing(null)
            setText('')
        }
    }


    useEffect(() => {
        if (isEditing) {
            setText(isEditing?.title)
            inputRef.current.focus()
        } else {
            setText('')
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
                <MdOutlineAddCircleOutline
                    className={`${style['btn-text']} ${'pointer'}`}
                />
            </button>
        </form>
    )
}

export default TaskForm