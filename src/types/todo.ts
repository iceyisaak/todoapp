export interface Task {
  taskId: string;
  taskTitle: string;
  isCompleted: boolean;
}

export interface TaskStore {
  tasks: Task[];
  isEditing: null | Task;
  isLoading: boolean;
}
