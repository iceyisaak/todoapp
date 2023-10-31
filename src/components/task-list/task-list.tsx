import { useTaskStore } from "../../features/todo-feature/todo-store"
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'




const TaskList = () => {


    const { tasks, isLoading } = useTaskStore((state) => ({
        tasks: state.tasks,
        isLoading: state.isLoading
    }))

    return (
        <div className={`${style['TaskList']}`}>
            <ul>
                {
                    !isLoading && tasks.length < 1 ?
                        <p className={`${style['no-task']}`}>
                            +++ Task List is Empty +++
                        </p>
                        :
                        tasks.map((task) =>
                            <TaskItem
                                key={task.taskId}
                                data={task}
                            />
                        )
                }
            </ul>
        </div>
    )
}

export default TaskList