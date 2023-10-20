import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { type Task, type TodoContext } from '../types/todo'


const TodoContext = createContext<TodoContext>(null!)

const TodoContextProvider = ({ children }: { children: ReactNode }) => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState({
        taskId: '',
        taskTitle: "",
        isEditing: false,
        isCompleted: false
    })

    useEffect(() => {
        fetchSavedTasks()
    }, [])


    const fetchSavedTasks = () => {
        setIsLoading(true)
        const savedTasks = localStorage.getItem("todo-list")
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
        setIsLoading(false)
    }



    const addTask = (taskTitle: string) => {
        const addedTask = {
            taskId: uuidv4(),
            taskTitle,
            isEditing: false,
            isCompleted: false
        }
        const tasksArray = [...tasks, addedTask]
        setTasks(tasksArray)
        localStorage.setItem("todo-list", JSON.stringify(tasksArray))
    }



    const deleteTask = (taskId: string) => {
        const deleteTaskConfirm = window.confirm('Delete this task?')
        if (deleteTaskConfirm) {
            const filterOutDeletedTask = tasks.filter(
                (task) => {
                    return task.taskId !== taskId
                }
            )
            setTasks(filterOutDeletedTask)
            localStorage.setItem("todo-list", JSON.stringify(filterOutDeletedTask))
        }
    }



    const deleteAllTasks = () => {
        const deleteAllTasksConfirm = window.confirm('Delete All Tasks?')
        if (deleteAllTasksConfirm) {
            localStorage.removeItem("todo-list")
            setTasks([])
        }
    }



    const editTask = (taskTitle: string) => {
        const editedTask = tasks.map(
            (task) => (
                task.taskId === taskToEdit.taskId ?
                    { ...task, taskTitle } :
                    task
            )
        )
        setTasks(editedTask)
        localStorage.setItem("todo-list", JSON.stringify(editedTask))
        setTaskToEdit({
            taskId: '',
            taskTitle: "",
            isEditing: false,
            isCompleted: false
        })
    }


    const selectTaskToEdit = (taskId: string, taskTitle: string, isCompleted: boolean) => {
        setTaskToEdit({
            taskId,
            taskTitle,
            isEditing: true,
            isCompleted
        })
    }


    const toggleTaskAsCompleted = (taskId: string) => {
        const toggledTask = tasks.map(
            (task) => (
                task.taskId === taskId ?
                    { ...task, isCompleted: !task.isCompleted } :
                    task
            )
        )
        setTasks(toggledTask)
        localStorage.setItem("todo-list", JSON.stringify(toggledTask))
    }



    const TodoContextValue = {
        addTask,
        tasks,
        deleteTask,
        editTask,
        taskToEdit,
        selectTaskToEdit,
        deleteAllTasks,
        isLoading,
        toggleTaskAsCompleted
    }


    return (
        <TodoContext.Provider value={TodoContextValue}>
            {children}
        </TodoContext.Provider >
    )

}

export const useTodoContext = () => {
    return useContext(TodoContext)
}

export { TodoContext, TodoContextProvider }
