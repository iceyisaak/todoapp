
export type Todo = {
    tasks: {
        taskId: number,
        taskTitle: string,
        editing: boolean
    }
    isLoading: boolean,
    updatedTask: string[],
    addTask: (newTask: {}) => void,
    editTask: (editedTask: string) => void,
    taskToEdit: {
        taskId: number,
        taskTitle: string,
        editing: boolean
    } | null,
    selectTaskToEdit: (id: number, taskTitle: string) => void,
    deleteTask: (id: string) => void,
    deleteAllTasks: () => void
}