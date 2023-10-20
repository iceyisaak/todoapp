import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { type Task, type Todo } from '../types'

type TodoContext = Todo & Task

const TodoContext = createContext<TodoContext>(null!)

const TodoContextProvider = ({ children }: { children: ReactNode }) => {

    const [tasks, setTasks] = useState<Task[]>([])
    // const [fetchedTasks, setFetchedTasks] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState({
        taskId: 0,
        taskTitle: "",
        editing: false
    })

    useEffect(() => {
        fetchSavedTasks()
    }, [])

    // console.log('tasks: ', tasks)

    const fetchSavedTasks = () => {
        setIsLoading(true)
        const savedTasks = localStorage.getItem("todo-list")
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
        setIsLoading(false)
    }



    const addTask = (text: string) => {
        const addedTask = {
            taskId: Math.random() * 10,
            taskTitle: text,
            editing: false
        }

        const tasksArray = [...tasks, addedTask]
        setTasks(tasksArray)
        localStorage.setItem("todo-list", JSON.stringify(tasksArray))
    }



    const deleteTask = (id: number) => {
        const deleteTaskConfirm = window.confirm('Delete this task?')
        if (deleteTaskConfirm) {
            const filterOutDeletedTask = tasks.filter(
                (task) => {
                    return task.taskId !== id
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
            taskId: 0,
            taskTitle: "",
            editing: false
        })
    }


    const selectTaskToEdit = (id: number, taskTitle: string) => {
        setTaskToEdit({
            taskId: id,
            taskTitle,
            editing: true
        })
    }



    const TodoContextValue = {
        addTask,
        tasks,
        deleteTask,
        editTask,
        taskToEdit,
        selectTaskToEdit,
        deleteAllTasks,
        isLoading
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
