import { useTodoContext } from '../../contexts/todo-context'
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'

const TaskList = () => {

    const { tasks, isLoading } = useTodoContext()

    // console.log("task-list.tsx", fetchedTasks)
    // console.log("task-list.tsx", tasks)

    console.log(tasks)

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div className={`${style['TaskList']}`}>
            {!isLoading && tasks.length < 1 && <p className={`${style['no-task']}`}>+++ Task List is Empty +++</p>}
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    )
}

export default TaskList