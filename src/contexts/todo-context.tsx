import { createContext, useContext, useEffect, useState } from 'react'

export interface TodoContextInterface {
    tasks: [
        id: string,
        text: string
    ],
    isLoading: boolean,
    taskToEdit: {
        task: {
            id: string,
            taskTitle: string
        },
        edit: boolean
    },
    task: {
        id: string
    },
    updatedTask: string[],
    addTask: (newTask: {}) => Promise<void>,
    editTask: (editedTask: string) => Promise<void>,
    selectTaskToEdit: (id: string) => void,
    deleteTask: (id: string) => Promise<void>,
    deleteAllTasks: () => void
}

const TodoContext = createContext<TodoContextInterface>(null!)

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [tasks, setTasks] = useState([])
    const [fetchedTasks, setFetchedTasks] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState({
        id: 0,
        taskTitle: "",
        edit: false
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



    const addTask = (text: string) => {

        const addedTask = {
            taskTitle: text,
            id: Math.random() * 10
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
                    return task.id !== id
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
                task.id === taskToEdit.id ? { ...task, taskTitle } : task
            )
        )

        setTasks(editedTask)
        localStorage.setItem("todo-list", JSON.stringify(editedTask))
        setTaskToEdit({
            id: 0,
            taskTitle: "",
            edit: false
        })
    }


    const selectTaskToEdit = (id: number, taskTitle: string) => {
        setTaskToEdit({
            id,
            taskTitle,
            edit: true
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
        // findItem,
        // editItem,
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
