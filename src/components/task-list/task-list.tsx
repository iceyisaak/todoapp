import { useTaskStore } from "../../features/todo-feature/todo-store"
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'




const TaskList = () => {


    // const { tasks, isLoading } = useTodoContext()
    const { tasks, isLoading } = useTaskStore((state) => ({
        tasks: state.tasks,
        isLoading: state.isLoading
    }))

    console.log('tasks: TaskList ', tasks)

    return (

        <div className={`${style['TaskList']}`}>
            {/* {
                !isLoading && tasks.length < 1 &&
                <p className={`${style['no-task']}`}>
                    +++ Task List is Empty +++
                </p>
            }
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.taskId} data={task} />
                ))}
            </ul> */}
            <ul>
                {
                    tasks.length < 1 ?
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