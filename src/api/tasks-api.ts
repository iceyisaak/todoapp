// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import axios from "axios"
// import { v4 as uuidV4 } from 'uuid'
// import { BASEURL as APIURL } from "./"

// import { EditTaskVariables, Task } from "../types"

// const getAllTasks = async () => {
//     const response = await axios.get(APIURL)
//     const data = response.data
//     return data as Task[]
// }

// const addTask = (newTask: string) => {
//     return axios.post(APIURL,
//         {
//             id: uuidV4(),
//             title: newTask,
//             isCompleted: false
//         }
//     )
// }

// const deleteTaskByID = async (id: string) => {
//     const response = await axios.delete(`${APIURL}${id}`)
//     const data = response.data
//     return data as Task[]
// }

// // const deleteAllTasks = async () => {
// //     // console.log('deleteAllTasks() - 1')
// //     // const currentQuery = useQueryClient()
// //     // console.log('deleteAllTasks() - 2')
// //     const response = await axios.get(APIURL)
// //     const data = response.data

// //     const prevTasks = data.getQueryData(['tasks'])
// //     const taskArray = prevTasks?.map(task => task.id);
// //     taskArray?.forEach(id => deleteTaskByID(id))
// //     console.log('deleteAllTasks() - DONE')
// // }

// const toggleTaskAsCompleted = async (task: Task) => {
//     const response = await axios.patch(`${APIURL}${task.id}`, { isCompleted: !task.isCompleted })
//     const data = response.data
//     return data as Task
// }

// const editTask = async ({ isEditing: task, text }: EditTaskVariables) => {
//     const response = await axios.patch(`${APIURL}${task.id}`, { title: text })
//     const data = response.data
//     return data as Task
// }

// export const useGetAllTasks = () => {
//     return useQuery({
//         queryKey: ['tasks'],
//         queryFn: getAllTasks
//     })
// }

// export const useAddTask = () => {
//     const currentQuery = useQueryClient()

//     return useMutation({
//         mutationKey: ['add-task'],
//         mutationFn: addTask,
//         onMutate: async (newTask: string) => {
//             await currentQuery.cancelQueries({ queryKey: ['tasks'] })
//             const prevTasks = currentQuery.getQueryData(['tasks'])
//             const optimisticTask = {
//                 id: uuidV4(),
//                 title: newTask,
//                 isCompleted: false
//             }
//             currentQuery.setQueryData(
//                 ['tasks'],
//                 (tasks: Task[]) => [...tasks, optimisticTask]
//             )
//             return { prevTasks }
//         },
//         onError: (_err, _newTask, context) => currentQuery.setQueryData(['tasks'], context?.prevTasks),
//         onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
//     })
// }

// export const useDeleteTaskByID = () => {
//     const currentQuery = useQueryClient()

//     return useMutation({
//         mutationKey: ['delete-task'],
//         mutationFn: deleteTaskByID,
//         onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
//     })
// }

// export const useDeleteAllTasks = () => {
//     const currentQuery = useQueryClient()

//     return useMutation({
//         mutationKey: ['delete-all-tasks'],
//         // mutationFn: deleteAllTasks,
//         mutationFn: async () => {
//             const prevTasks = currentQuery.getQueryData<Task[]>(['tasks'])
//             const taskArray = prevTasks?.map(task => task.id);
//             taskArray?.forEach(id => deleteTaskByID(id))
//         },
//         // onMutate: async () => {
//         //     const prevTasks = currentQuery.getQueryData<Task[]>(['tasks'])
//         //     const taskArray = prevTasks?.map(task => task.id);
//         //     taskArray?.forEach(id => deleteTaskByID(id))
//         // },
//         onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
//     })
// }

// export const useToggleTaskAsCompleted = () => {
//     const currentQuery = useQueryClient()

//     return useMutation({
//         mutationKey: ['toggle-task'],
//         mutationFn: toggleTaskAsCompleted,
//         onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
//     })
// }

// export const useEditTask = () => {
//     const currentQuery = useQueryClient()

//     return useMutation({
//         mutationKey: ['edit-task'],
//         mutationFn: editTask,
//         onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
//     })
// }
