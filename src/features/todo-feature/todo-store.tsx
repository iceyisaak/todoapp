import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { Task, TodoContext } from "../../types";


const taskInitialState: TodoContext = {
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

export const addTask = (task: Task) => {
    useTaskStore.setState(
        (state) => ({
            tasks: [...state.tasks, task]
        })
    )
}

export const deleteTask = (id: string) => {
    useTaskStore.setState(
        (state) => ({
            tasks: state.tasks.filter(
                (task) => {
                    return task.taskId !== id
                }
            )
        })
    )
}

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
    console.log('selectTaskToEdit(): ', task)
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






// export const tasks = () => {
//     useTaskStore.tasks
// }


// export const useTaskStore = create<TodoContext>()(
//     persist(
//         (set) => ({
//             tasks: [],
//             isEditing: null,
//             isLoading: false,

//             addTask: (task: Task) => {
//                 set((state) => ({
//                     tasks: [...state.tasks, task]
//                 }))
//             },

//             deleteTask: (id: string) => {
//                 set((state) => ({
//                     tasks: state.tasks.filter(
//                         (task) => {
//                             return task.taskId !== id
//                         }
//                     )
//                 }))
//             },

//             deleteAllTasks: () => set({ tasks: [] }),

//             toggleTaskAsCompleted: (id: string) => {
//                 set((state) => ({
//                     tasks: state.tasks.map(
//                         (task) => (
//                             task.taskId === id ?
//                                 { ...task, isCompleted: !task.isCompleted } :
//                                 task
//                         )
//                     )
//                 }))
//             },

//             selectTaskToEdit: (task: Task) => {
//                 console.log('selectTaskToEdit(): ', task)
//             },

//             editTask: (id: string, title: string) => {
//                 console.log('editTask(): ', id, title)
//             },

//             setIsEditing: () => {
//                 alert('setIsEditing()')
//             },

//             setIsLoading: () => {
//                 set((state) => ({
//                     isLoading: !state.isLoading
//                 }))
//             }

//         }),
//         { name: 'tasks-store' }
//     )
// )

