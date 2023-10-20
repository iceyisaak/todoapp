
export type Task = {
    taskId: string,
    taskTitle: string,
    isCompleted: boolean
}


export type TodoContext = {
    tasks: Task[],
    addTask: (taskTitle: string) => void,
    deleteTask: (taskId: string) => void,
    selectTaskToEdit: (task: Task) => void,
    editTask: (taskId: string, tastTitle: string) => void,
    isEditing: null | Task,
    deleteAllTasks: () => void,
    toggleTaskAsCompleted: (taskId: string) => void,
    isLoading: boolean
}