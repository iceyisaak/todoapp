import { atom } from "jotai";
import { RESET } from "jotai/utils";
import { v4 as uuidV4 } from "uuid";

import { Task } from "../../types";
import { isEditingAtom, newTaskAtom, tasksAtom } from "./todo-initialstate";

export const addTaskAtom = atom(null, (get, set) => {
  const text = get(newTaskAtom).trim();
  if (!text) return;
  set(tasksAtom, (prev) => [
    ...prev,
    { taskId: uuidV4(), taskTitle: text, isCompleted: false },
  ]);
  set(newTaskAtom, "");
});

export const deleteTaskAtom = atom(null, (get, set, id: string) => {
  set(
    tasksAtom,
    get(tasksAtom).filter((t) => t.taskId !== id),
  );
  set(isEditingAtom, null);
});

export const deleteAllTasksAtom = atom(null, (_, set) => {
  set(tasksAtom, RESET);
  set(isEditingAtom, null);
});

export const toggleTaskAsCompletedAtom = atom(null, (get, set, id: string) => {
  set(
    tasksAtom,
    get(tasksAtom).map((t) =>
      t.taskId === id ? { ...t, isCompleted: !t.isCompleted } : t,
    ),
  );
});

export const selectTaskToEditAtom = atom(null, (_, set, task: Task) => {
  set(isEditingAtom, task);
});

// FIX: wrap two params into a single payload object
export const editTaskAtom = atom(
  null,
  (get, set, payload: { taskId: string; taskTitle: string }) => {
    set(
      tasksAtom,
      get(tasksAtom).map((t) =>
        t.taskId === payload.taskId
          ? { ...t, taskTitle: payload.taskTitle }
          : t,
      ),
    );
    set(isEditingAtom, null);
    set(newTaskAtom, "");
  },
);
