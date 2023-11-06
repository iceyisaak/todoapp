import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Task } from "../types"


export const fetchAllTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3100/tasks')
            const data: unknown = await response.data()
            console.log('data: ', data)
            return data as Task[]
        }
    })
}