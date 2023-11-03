import { useAtom } from "jotai"
import { isLoadingAtom, tasksAtom, tasksSplitAtom } from "../../features/todo-feature/todo-initialstate"
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'



const TaskList = () => {

    // const [tasks] = useAtom(tasksAtom)
    const [tasks] = useAtom(tasksSplitAtom)
    const [isLoading] = useAtom(isLoadingAtom)

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
                                // key={task.taskId}
                                // data={task}
                                key={task.toString()}
                                atom={task}
                            />
                        )
                }
            </ul>
        </div>
    )
}

export default TaskList