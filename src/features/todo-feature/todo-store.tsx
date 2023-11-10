import { atom } from "jotai";
import { isEditingAtom } from "./todo-initialstate";

import { Task } from "../../types";



export const selectTaskToEditAtom = atom(
    null,
    (_, set, task: Task) => {
        set(isEditingAtom, task)
    }
)
