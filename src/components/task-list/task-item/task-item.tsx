import { useAtom } from 'jotai'
import { deleteTaskAtom, selectTaskToEditAtom, toggleTaskAsCompletedAtom } from '../../../features/todo-feature/todo-store'


import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { type Task } from '../../../types'
import style from './task-item.module.scss'


type TaskItem = {
    data: Task
}


const TaskItem = ({ data }: TaskItem) => {


    const [, deleteTask] = useAtom(deleteTaskAtom)
    const [, toggleTaskAsCompleted] = useAtom(toggleTaskAsCompletedAtom)
    const [, selectTaskToEdit] = useAtom(selectTaskToEditAtom)

    const deleteTaskHandler = () => {
        const deleteTaskConfirm = confirm('Delete this task?')
        if (deleteTaskConfirm) {
            deleteTask(data.id)
        }
    }

    const selectEditTaskHandler = () => {
        selectTaskToEdit(data)
    }

    const toggleTaskAsCompleteHandler = () => {
        toggleTaskAsCompleted(data.id)
    }

    return (
        <li className={`${style['TaskItem']}`} key={data.id}>
            <input
                type="checkbox"
                onChange={toggleTaskAsCompleteHandler}
                checked={data.isCompleted ? true : false}
                className={`${style['checkbox']}`}
            />
            <span className={`${style['task-name']} ${data.isCompleted ? `${style['isCompleted']}` : ``}`}>
                {data.title}
            </span>
            <MdOutlineEdit
                onClick={selectEditTaskHandler}
                className={`${'pointer'} ${style['item-btn']}`}
            />
            <MdOutlineDelete
                onClick={deleteTaskHandler}
                className={`${'pointer'} ${style['item-btn']}`}
            />
        </li>
    )
}


export default TaskItem