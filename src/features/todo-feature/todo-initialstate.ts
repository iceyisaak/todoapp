import { atom } from "jotai"
import { atomWithStorage, splitAtom } from "jotai/utils"
import { Task } from "../../types"

export const tasksAtom = atomWithStorage<Task[]>('task-list', [])
export const tasksSplitAtom = splitAtom(tasksAtom)
export const newTaskAtom = atom('')
export const isLoadingAtom = atom(false)
export const isEditingAtom = atom<null | Task>(null)