import { v4 as uuidV4 } from 'uuid';
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { atom } from "jotai";
import { atomWithStorage, RESET } from 'jotai/utils';
import { Task, TaskInitialState } from "../../types";



export const tasksAtom = atomWithStorage<Task[]>('task-list', [])
export const newTaskAtom = atom('')
export const isLoadingAtom = atom(false)


const taskInitialState: TaskInitialState = {
    tasks: [],
    isEditing: null,
    isLoading: false
}

export const useTaskStore = create<typeof taskInitialState>()(
    subscribeWithSelector(
        persist(
            () => taskInitialState,
            { name: 'task-store' }
        )
    )
)


export const addTaskAtom = atom(
    () => '',
    (get, set) => {
        set(tasksAtom, addTask(get(tasksAtom), get(newTaskAtom)))
        set(newTaskAtom, '')
    }
)

export const removeTaskAtom = atom(
    () => '',
    (get, set, id: string) => {
        set(tasksAtom, removeTask(get(tasksAtom), id))
    }
)

export const removeAllTasksAtom = atom(
    () => '',
    (_, set) => {
        set(tasksAtom, RESET)
    }
)


const addTask = (tasks: Task[], text: string) => {
    return [
        ...tasks,
        {
            taskId: uuidV4(),
            taskTitle: text,
            isCompleted: false
        }
    ]
}

const removeTask = (tasks: Task[], id: string) => {
    return tasks.filter(
        (task) => {
            return task.taskId !== id
        }
    )
}




// export const addTask = (task: Task) => {
//     useTaskStore.setState(
//         (state) => ({
//             tasks: [...state.tasks, task]
//         })
//     )
// }

// export const deleteTask = (id: string) => {
//     useTaskStore.setState(
//         (state) => ({
//             tasks: state.tasks.filter(
//                 (task) => {
//                     return task.taskId !== id
//                 }
//             )
//         })
//     )
// }

export const deleteAllTasks = () => {
    useTaskStore.setState(
        () => ({
            tasks: []
        })
    )
}

export const toggleTaskAsCompleted = (id: string) => {
    useTaskStore.setState(
        (state) => ({
            tasks: state.tasks.map(
                (task) => (
                    task.taskId === id ?
                        { ...task, isCompleted: !task.isCompleted } :
                        task
                )
            )
        }))
}

export const selectTaskToEdit = (task: Task) => {
    useTaskStore.setState(
        (state) => ({
            isEditing: state.isEditing = {
                taskId: task.taskId,
                taskTitle: task.taskTitle,
                isCompleted: task.isCompleted
            }
        })
    )
}

export const editTask = (taskId: string, taskTitle: string) => {
    useTaskStore.setState(
        (state) => ({
            tasks: state.tasks.map(
                (task) => (
                    task.taskId === taskId ?
                        { ...task, taskTitle } :
                        task
                )
            )
        })
    )
}

export const setIsEditingDone = () => {
    useTaskStore.setState(
        (state) => ({
            isEditing: state.isEditing = null
        }))
}

export const setIsLoading = (action: boolean) => {
    useTaskStore.setState(
        (state) => ({
            isLoading: state.isLoading === action
        }))
}


