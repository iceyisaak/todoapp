import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import {
    removeTaskAtom,
    // deleteTask,
    selectTaskToEditAtom,
    toggleTaskAsCompletedAtom
} from '../../../features/todo-feature/todo-store'

import { useAtom } from 'jotai'
import { type Task } from '../../../types'
import style from './task-item.module.scss'


type TaskItem = {
    data: Task
}

const TaskItem = ({ data }: TaskItem) => {

    const [, removeTask] = useAtom(removeTaskAtom)
    const [, toggleTaskAsCompleted] = useAtom(toggleTaskAsCompletedAtom)
    const [, selectTaskToEdit] = useAtom(selectTaskToEditAtom)

    const deleteTaskHandler = () => {
        const deleteTaskConfirm = confirm('Delete this task?')
        if (deleteTaskConfirm) {
            removeTask(data.taskId)
        }
    }

    const selectEditTaskHandler = () => {
        selectTaskToEdit(data)
        // selectTaskToEdit(data)
    }

    const toggleTaskAsCompleteHandler = () => {
        toggleTaskAsCompleted(data.taskId)
    }

    return (
        <li className={`${style['TaskItem']}`} key={data.taskId}>
            <input
                type="checkbox"
                onChange={toggleTaskAsCompleteHandler}
                checked={data.isCompleted ? true : false}
                className={`${style['checkbox']}`}
            />
            <span className={`${style['task-name']} ${data.isCompleted ? `${style['isCompleted']}` : ``}`}>
                {data.taskTitle}
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