import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { TodoContextInterface, useTodoContext } from '../../../contexts/todo-context'
import style from './task-item.module.scss'

const TaskItem = ({ task }: TodoContextInterface) => {

    const { deleteTask, selectTaskToEdit } = useTodoContext()

    const onDeleteTask = () => {
        deleteTask(task.id)
    }

    const onSelectEditTask = () => {
        selectTaskToEdit(task.id, task.taskTitle)
    }

    return (
        <li className={`${style['TaskItem']}`}>
            <span className={`${style['task-name']}`}>
                {task.taskTitle}
            </span>
            <MdOutlineEdit onClick={onSelectEditTask} className={`${'pointer'} ${style['item-btn']}`} />
            <MdOutlineDelete onClick={onDeleteTask} className={`${'pointer'} ${style['item-btn']}`} />
        </li>
    )
}



export default TaskItem