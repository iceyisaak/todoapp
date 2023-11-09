import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { v4 as uuidV4 } from 'uuid'

import { Task } from "../types"

const APIURL = 'http://localhost:3100/tasks/'
const queryClient = new QueryClient


export const fetchAllTasks = () => {
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
    return useMutation({
        mutationKey: ['add-task'],
        mutationFn: (newTask: string) => {
            return axios.post(APIURL, {
                id: uuidV4(),
                title: newTask,
                isCompleted: false
            })
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
    })
}