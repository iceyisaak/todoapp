
export type Task = {
    id: string,
    title: string,
    isCompleted: boolean
}

export type EditTaskVariables = {
    isEditing: Task,
    text: string
}

// export type TaskInitialState = {
//     tasks: Task[],
//     isEditing: null | Task,
//     isLoading: boolean
// }

