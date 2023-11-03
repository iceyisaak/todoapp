import { atom } from "jotai";
import { RESET } from 'jotai/utils';
import { v4 as uuidV4 } from 'uuid';

import { Task } from "../../types";
import { isEditingAtom, newTaskAtom, tasksAtom } from "./todo-initialstate";


export const addTaskAtom = atom(
    null,
    (get, set) => {
        set(tasksAtom, addTask(get(tasksAtom), get(newTaskAtom)))
        set(newTaskAtom, '')
    }
)

export const deleteTaskAtom = atom(
    null,
    (get, set, id: string) => {
        set(tasksAtom, deleteTask(get(tasksAtom), id))
    }
)

export const deleteAllTasksAtom = atom(
    null,
    (_, set) => {
        set(tasksAtom, RESET)
    }
)

export const toggleTaskAsCompletedAtom = atom(
    null,
    (get, set, id: string) => {
        set(tasksAtom, toggleTaskAsCompleted(get(tasksAtom), id))
    }
)

export const selectTaskToEditAtom = atom(
    null,
    (_, set, task: Task) => {
        set(isEditingAtom, task)
    }
)

export const editTaskAtom = atom(
    null,
    (get, set, taskId: string, taskTitle: string) => {
        set(tasksAtom, editTask(get(tasksAtom), taskId, taskTitle))
        set(isEditingAtom, null)
    }
)



const addTask = (tasks: Task[], text: string) => {
    return [
        ...tasks,
        {
            taskId: uuidV4(),
            taskTitle: text,
            isCompleted: false
        }
    ]
}

const deleteTask = (tasks: Task[], id: string) => {
    return tasks.filter(
        (task) => {
            return task.taskId !== id
        }
    )
}

const toggleTaskAsCompleted = (tasks: Task[], id: string) => {
    return tasks.map(
        (task) => (
            task.taskId === id ?
                { ...task, isCompleted: !task.isCompleted } :
                task
        )
    )
}

const editTask = (tasks: Task[], taskId: string, taskTitle: string) => {
    return tasks.map(
        (task) => (
            task.taskId === taskId ?
                { ...task, taskTitle } :
                task
        )
    )
}

