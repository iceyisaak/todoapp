
export type Task = {
    taskId: number,
    taskTitle: string,
    isEditing: boolean,
    isCompleted: boolean
}


export type TodoContext = {
    tasks: Task[],
    addTask: (taskTitle: string) => void,
    deleteTask: (taskId: number) => void,
    editTask: (tastTitle: string) => void,
    taskToEdit: Task,
    selectTaskToEdit: (taskId: number, taskTitle: string, isCompleted: boolean) => void,
    deleteAllTasks: () => void,
    toggleTaskAsCompleted: (taskId: number) => void,
    isLoading: boolean
}