export type Task = {
  taskId: string;
  taskTitle: string;
  isCompleted: boolean;
};

export type TodoContext = {
  tasks: Task[];
  addTask: (taskTitle: string) => void;
  deleteTask: (taskId: string) => void;
  selectTaskToEdit: (task: Task) => void;
  editTask: (taskId: string, taskTitle: string) => void;
  isEditing: null | Task;
  deleteAllTasks: () => void;
  toggleTaskAsCompleted: (taskId: string) => void;
  isLoading: boolean;
};

////////////////////////

// export type Task = {
//     id: string,
//     title: string,
//     isCompleted: boolean
// }

// export type EditTaskVariables = {
//     isEditing: Task,
//     text: string
// }

// export type TaskInitialState = {
//     tasks: Task[],
//     isEditing: null | Task,
//     isLoading: boolean
// }
