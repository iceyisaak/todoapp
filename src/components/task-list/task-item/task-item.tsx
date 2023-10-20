import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { useTodoContext } from '../../../contexts/todo-context'

import { type Task } from '../../../types'
import style from './task-item.module.scss'

type TaskItem = {
    data: Task
}

const TaskItem = ({ data }: TaskItem) => {

    const { deleteTask, selectTaskToEdit, toggleTaskAsCompleted } = useTodoContext()

    const onDeleteTask = () => {
        deleteTask(data.taskId)
    }

    const onSelectEditTask = () => {
        selectTaskToEdit(data.taskId, data.taskTitle, data.isCompleted)
    }

    const onToggleTaskAsComplete = () => {
        toggleTaskAsCompleted(data.taskId)
    }

    return (
        <li className={`${style['TaskItem']}`}>
            <input
                type="checkbox"
                onChange={onToggleTaskAsComplete}
                checked={data.isCompleted ? true : false}
                className={`${style['checkbox']}`}
            />
            <span className={`${style['task-name']} ${data.isCompleted ? `${style['isCompleted']}` : ``}`}>
                {data.taskTitle}
            </span>
            <MdOutlineEdit onClick={onSelectEditTask} className={`${'pointer'} ${style['item-btn']}`} />
            <MdOutlineDelete onClick={onDeleteTask} className={`${'pointer'} ${style['item-btn']}`} />
        </li>
    )
}



export default TaskItem