// import { useAtom } from "jotai"
// import { isLoadingAtom, tasksSplitAtom } from "../../features/todo-feature/todo-initialstate"
import { useGetAllTasks, useAddTask } from "../../api/tasks-api"
import TaskItem from "./task-item/task-item"

import style from './task-list.module.scss'



const TaskList = () => {


    const { data: tasks, isLoading } = useGetAllTasks()
    const { isPending, isError } = useAddTask()

    return (
        <ul className={`${style['TaskList']}`}>
            {
                !isLoading && tasks && tasks?.length < 1 ?
                    <p className={`${style['no-task']}`}>
                        +++ Task List is Empty +++
                    </p>
                    :
                    isPending ?
                        'Adding new Task'
                        :
                        isError ?
                            'Something went wrong.'
                            :
                            tasks?.map((task) =>
                                <TaskItem
                                    key={task.id}
                                    data={task}
                                />
                            )
            }
        </ul>

    )
}

export default TaskList