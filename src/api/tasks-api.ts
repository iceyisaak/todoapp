import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { v4 as uuidV4 } from 'uuid'

import { Task } from "../types"

const APIURL = 'http://localhost:3100/tasks/'
// const queryClient = new QueryClient

export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await axios.get(APIURL)
            const data: unknown = response.data
            return data as Task[]
        }
    })
}

export const useAddTask = () => {

    const currentQuery = useQueryClient()

    return useMutation({
        mutationKey: ['add-task'],
        mutationFn: (newTask: string) => {
            return axios.post('http://localhost:3100/tasks/', {
                id: uuidV4(),
                title: newTask,
                isCompleted: false
            })
        },
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