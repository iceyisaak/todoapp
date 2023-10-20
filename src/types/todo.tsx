
export type Task = {
    taskId: string,
    taskTitle: string,
    isEditing: boolean,
    isCompleted: boolean
}


export type TodoContext = {
    tasks: Task[],
    addTask: (taskTitle: string) => void,
    deleteTask: (taskId: string) => void,
    editTask: (tastTitle: string) => void,
    taskToEdit: Task,
    selectTaskToEdit: (taskId: string, taskTitle: string, isCompleted: boolean) => void,
    deleteAllTasks: () => void,
    toggleTaskAsCompleted: (taskId: string) => void,
    isLoading: boolean
}