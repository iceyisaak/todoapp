import { useAtom } from 'jotai'
import { selectTaskToEditAtom } from '../../../features/todo-feature/todo-store'


import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import { useAddTask, useDeleteTaskByID, useToggleTaskAsCompleted } from '../../../api/tasks-api'
import { type Task } from '../../../types'
import style from './task-item.module.scss'


type TaskItem = {
    data: Task
}


const TaskItem = ({ data }: TaskItem) => {


    const [, selectTaskToEdit] = useAtom(selectTaskToEditAtom)

    const { isPending } = useAddTask()
    const { mutate: toggleTaskAsCompleted } = useToggleTaskAsCompleted()
    const { mutate: deleteTaskByID } = useDeleteTaskByID()



    const deleteTaskHandler = () => {
        const deleteTaskConfirm = confirm('Delete this task?')
        if (deleteTaskConfirm) {
            deleteTaskByID(data.id)
        }
    }

    const selectEditTaskHandler = () => {
        selectTaskToEdit(data)
    }

    const toggleTaskAsCompleteHandler = () => {
        toggleTaskAsCompleted(data)
    }

    return (

        <li className={`${style['TaskItem']}`} key={data.id}>
            <input
                type="checkbox"
                onChange={toggleTaskAsCompleteHandler}
                checked={data.isCompleted ? true : false}
                className={`${style['checkbox']}`}
            />
            <span className={`
                ${style['task-name']}
                ${data.isCompleted ? `${style['isCompleted']}` : ``}
                ${isPending ? `${style['isPending']}` : ``}
                `}>
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