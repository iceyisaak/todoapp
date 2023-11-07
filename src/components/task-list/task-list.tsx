// import { useAtom } from "jotai"
// import { isLoadingAtom, tasksSplitAtom } from "../../features/todo-feature/todo-initialstate"
import { atom, useAtom, useAtomValue } from "jotai"
import { fetchAllTasks } from "../../api/tasks-api"
import TaskItem from "./task-item/task-item"
import { splitAtom } from "jotai/utils"

import { Task } from "../../types"
import style from './task-list.module.scss'






const TaskList = () => {

    // const [tasks] = useAtom(tasksSplitAtom)
    // const [isLoading] = useAtom(isLoadingAtom)
    const { data: tasks, isLoading } = fetchAllTasks()
    // const tasksAtom = atom(data)
    // const tasksSplitAtom = splitAtom(tasksAtom)
    // const tasks = useAtomValue(tasksSplitAtom)



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