import { atom } from "jotai";
import { RESET } from 'jotai/utils';
import { v4 as uuidV4 } from 'uuid';
import { isEditingAtom, newTaskAtom, tasksAtom } from "./todo-initialstate";

import { Task } from "../../types";




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
        set(isEditingAtom, null)
    }
)

export const deleteAllTasksAtom = atom(
    null,
    (_, set) => {
        set(tasksAtom, RESET)
        set(isEditingAtom, null)
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
    (get, set, taskId: string, title: string) => {
        set(tasksAtom, editTask(get(tasksAtom), taskId, title))
        set(isEditingAtom, null)
    }
)



const addTask = (tasks: Task[], text: string) => {
    return [
        ...tasks,
        {
            id: uuidV4(),
            title: text,
            isCompleted: false
        }
    ]
}

const deleteTask = (tasks: Task[], id: string) => {
    return tasks.filter(
        (task) => {
            return task.id !== id
        }
    )
}

const toggleTaskAsCompleted = (tasks: Task[], id: string) => {
    return tasks.map(
        (task) => (
            task.id === id ?
                { ...task, isCompleted: !task.isCompleted } :
                task
        )
    )
}

const editTask = (tasks: Task[], taskId: string, title: string) => {
    return tasks.map(
        (task) => (
            task.id === taskId ?
                { ...task, title } :
                task
        )
    )
}

