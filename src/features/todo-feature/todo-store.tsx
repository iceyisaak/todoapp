import { create } from "zustand";

import { Task, TodoContext } from "../../types";
import { persist } from "zustand/middleware";



export const useTaskStore = create<TodoContext>()(
    persist(
        (set) => ({
            tasks: [],
            isEditing: null,
            isLoading: false,

            addTask: (task: Task) => {
                set((state) => ({
                    tasks: [...state.tasks, task]
                }))
            },

            deleteTask: (id: string) => {
                set((state) => ({
                    tasks: state.tasks.filter(
                        (task) => {
                            return task.taskId !== id
                        }
                    )
                }))
            },

            deleteAllTasks: () => set({ tasks: [] }),

            toggleTaskAsCompleted: (id: string) => {
                set((state) => ({
                    tasks: state.tasks.map(
                        (task) => (
                            task.taskId === id ?
                                { ...task, isCompleted: !task.isCompleted } :
                                task
                        )
                    )
                }))
            },

            selectTaskToEdit: (task: Task) => {
                console.log('selectTaskToEdit(): ', task)
            },

            editTask: (id: string, title: string) => {
                console.log('editTask(): ', id, title)
            },

            setIsEditing: () => {
                alert('setIsEditing()')
            },

            setIsLoading: () => {
                alert('setIsLoading()')
            }

        }),
        { name: 'tasks-store' }
    )
)

