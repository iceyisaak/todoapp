import { useAtom } from 'jotai'
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { addTaskAtom, editTaskAtom } from '../../features/todo-feature/todo-store'
import { isEditingAtom, newTaskAtom } from '../../features/todo-feature/todo-initialstate'


import { MdOutlineAddCircleOutline } from 'react-icons/md'
import style from './task-form.module.scss'



const TaskForm = () => {

    const inputRef = useRef<HTMLInputElement>(null!)
    const [, addTask] = useAtom(addTaskAtom)
    const [, editTask] = useAtom(editTaskAtom)
    const [isEditing] = useAtom(isEditingAtom)
    const [text, setText] = useAtom(newTaskAtom)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

        if (isEditing === null) {
            addTask()
            setText('')
        } else if (isEditing !== null) {
            editTask(isEditing.id, text)
            setText('')
        }
    }


    useEffect(() => {
        if (isEditing) {
            setText(isEditing?.taskTitle)
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