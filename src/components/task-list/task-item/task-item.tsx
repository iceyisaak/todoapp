import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
// import { useTodoContext } from '../../../contexts/todo-context'
// import { deleteTask } from '../../../features/todo-feature/todo-slice'


import { type Task } from '../../../types'
import style from './task-item.module.scss'
import { useTaskStore } from '../../../features/todo-feature/todo-store'

type TaskItem = {
    data: Task
}

const TaskItem = ({ data }: TaskItem) => {

    // const { deleteTask, selectTaskToEdit, toggleTaskAsCompleted } = useTodoContext()
    const { deleteTask, toggleTaskAsCompleted, selectTaskToEdit } = useTaskStore(
        (state) => ({
            deleteTask: state.deleteTask,
            toggleTaskAsCompleted: state.toggleTaskAsCompleted,
            selectTaskToEdit: state.selectTaskToEdit
        })
    )

    const onDeleteTask = () => {
        // deleteTask(data.taskId)
        // console.log('data.taskId: ', data.taskId)
        const id = data.taskId
        deleteTask(data.taskId)
        console.log({ id })

    }

    const onSelectEditTask = () => {
        selectTaskToEdit(data)
    }

    const onToggleTaskAsComplete = () => {
        toggleTaskAsCompleted(data.taskId)
    }

    return (
        <li className={`${style['TaskItem']}`} key={data.taskId}>
            <input
                type="checkbox"
                onChange={onToggleTaskAsComplete}
                checked={data.isCompleted ? true : false}
                className={`${style['checkbox']}`}
            />
            <span className={`${style['task-name']} ${data.isCompleted ? `${style['isCompleted']}` : ``}`}>
                {data.taskTitle}
            </span>
            <MdOutlineEdit
                onClick={onSelectEditTask}
                className={`${'pointer'} ${style['item-btn']}`}
            />
            <MdOutlineDelete
                onClick={onDeleteTask}
                className={`${'pointer'} ${style['item-btn']}`}
            />
        </li>
    )
}



export default TaskItem