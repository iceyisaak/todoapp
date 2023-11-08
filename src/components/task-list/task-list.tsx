// import { useAtom } from "jotai"
// import { isLoadingAtom, tasksSplitAtom } from "../../features/todo-feature/todo-initialstate"
import { fetchAllTasks } from "../../api/tasks-api"
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'



const TaskList = () => {


    const { data: tasks, isLoading } = fetchAllTasks()

    return (
        <div className={`${style['TaskList']}`}>
            <ul>
                {
                    !isLoading && tasks && tasks?.length < 1 ?
                        <p className={`${style['no-task']}`}>
                            +++ Task List is Empty +++
                        </p>
                        :
                        tasks?.map((task) =>
                            <TaskItem
                                key={task.id}
                                data={task}
                            />
                        )
                }
            </ul>
        </div>
    )
}

export default TaskList