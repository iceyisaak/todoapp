import { atom } from "jotai";
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

export const editTaskAtom = atom(
  null,
  (_, set, payload: { taskId: string; taskTitle: string }) => {
    set(tasksAtom, (prev) =>
      prev.map((t) =>
        t.taskId === payload.taskId
          ? { ...t, taskTitle: payload.taskTitle }
          : t,
      ),
    );
    set(isEditingAtom, null);
    set(newTaskAtom, "");
  },
);

export const deleteTaskAtom = atom(null, (_, set, id: string) => {
  set(tasksAtom, (prev) => prev.filter((t) => t.taskId !== id));
  set(isEditingAtom, null);
});

export const deleteAllTasksAtom = atom(null, (_, set) => {
  set(tasksAtom, []);
  set(isEditingAtom, null);
});

export const toggleTaskAtom = atom(null, (_, set, id: string) => {
  set(tasksAtom, (prev) =>
    prev.map((t) =>
      t.taskId === id ? { ...t, isCompleted: !t.isCompleted } : t,
    ),
  );
});

export const selectTaskToEditAtom = atom(null, (_, set, task: Task) => {
  set(isEditingAtom, task);
});
