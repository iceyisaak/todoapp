
export type Task = {
    taskId: number,
    taskTitle: string,
    editing: boolean
}


export type TodoContext = {
    tasks: Task[],
    addTask: (text: string) => void,
    deleteTask: (id: number) => void,
    editTask: (tastTitle: string) => void,
    taskToEdit: Task,
    selectTaskToEdit: (id: number, taskTitle: string) => void,
    deleteAllTasks: () => void,
    isLoading: boolean
}