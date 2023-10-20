import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { useTodoContext } from '../../../contexts/todo-context'

import { type Task } from '../../../types'
import style from './task-item.module.scss'

type TaskItem = Task

const TaskItem = ({ data }: TaskItem) => {

    const { deleteTask, selectTaskToEdit } = useTodoContext()

    const onDeleteTask = () => {
        deleteTask(data.taskId)
    }

    const onSelectEditTask = () => {
        console.log('onSelectEditTask()')
        selectTaskToEdit(data.taskId, data.taskTitle)
    }

    return (
        <li className={`${style['TaskItem']}`}>
            <span className={`${style['task-name']}`}>
                {data.taskTitle}
            </span>
            <MdOutlineEdit onClick={onSelectEditTask} className={`${'pointer'} ${style['item-btn']}`} />
            <MdOutlineDelete onClick={onDeleteTask} className={`${'pointer'} ${style['item-btn']}`} />
        </li>
    )
}



export default TaskItem