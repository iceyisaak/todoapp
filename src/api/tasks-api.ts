import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { v4 as uuidV4 } from 'uuid'

import { Task } from "../types"

const APIURL = 'http://localhost:3100/tasks/'
// const queryClient = new QueryClient




const getAllTasks = async () => {
    const response = await axios.get(APIURL)
    const data = response.data
    return data as Task[]
}

const addTask = (newTask: string) => {
    return axios.post(APIURL, {
        id: uuidV4(),
        title: newTask,
        isCompleted: false
    })
}

const deleteTaskByID = async (id: string) => {
    return await axios.delete(`http://localhost:3100/tasks/${id}`)
}




export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: getAllTasks
    })
}


export const useAddTask = () => {

    const currentQuery = useQueryClient()

    return useMutation({
        mutationKey: ['add-task'],
        mutationFn: addTask,
        onMutate: async (newTask: string) => {
            await currentQuery.cancelQueries({ queryKey: ['tasks'] })
            const prevTasks = currentQuery.getQueryData(['tasks'])
            const optimisticTask = {
                id: uuidV4(),
                title: newTask,
                isCompleted: false
            }
            currentQuery.setQueryData(
                ['tasks'],
                (tasks: Task[]) => [...tasks, optimisticTask]
            )
            return { prevTasks }
        },
        onError: (_err, _newTask, context) => currentQuery.setQueryData(['tasks'], context?.prevTasks),
        onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
    })
}


export const useDeleteTaskByID = () => {
    const currentQuery = useQueryClient()

    return useMutation({
        mutationKey: ['delete-task'],
        mutationFn: deleteTaskByID,
        onSettled: () => currentQuery.invalidateQueries({ queryKey: ['tasks'] })
    })
}