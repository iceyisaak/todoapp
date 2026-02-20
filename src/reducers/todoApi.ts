import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { pb } from "../lib/pocketbase";
import { type Task } from "../types/todo";

// Shape returned by PocketBase — includes its own "id" field
type PbTask = {
  id: string;
  taskTitle: string;
  isCompleted: boolean;
};

// Map PocketBase record → our Task type
const toTask = (record: PbTask): Task => ({
  taskId: record.id,
  taskTitle: record.taskTitle,
  isCompleted: record.isCompleted,
});

export const todoApi = createApi({
  reducerPath: "todoApi",
  // fakeBaseQuery is used when your fetching logic is custom (not fetch/axios)
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    // GET all tasks
    getTasks: builder.query<Task[], void>({
      queryFn: async () => {
        try {
          const result = await pb.collection("tasks").getList<PbTask>(1, 200);
          return { data: result.items.map(toTask) };
        } catch (error: any) {
          console.log("PocketBase error:", error.status, error.data);
          return {
            error: {
              status: error.status,
              message: error.message,
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ taskId }) => ({
                type: "Task" as const,
                id: taskId,
              })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),

    // POST — create a task
    addTask: builder.mutation<Task, string>({
      queryFn: async (taskTitle) => {
        try {
          const record = await pb.collection("tasks").create<PbTask>({
            taskTitle,
            isCompleted: false,
          });
          return { data: toTask(record) };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    // PATCH — edit task title
    editTask: builder.mutation<Task, { taskId: string; taskTitle: string }>({
      queryFn: async ({ taskId, taskTitle }) => {
        try {
          const record = await pb
            .collection("tasks")
            .update<PbTask>(taskId, { taskTitle });
          return { data: toTask(record) };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_result, _error, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),

    // PATCH — toggle completed
    toggleTask: builder.mutation<
      Task,
      { taskId: string; isCompleted: boolean }
    >({
      queryFn: async ({ taskId, isCompleted }) => {
        try {
          const record = await pb
            .collection("tasks")
            .update<PbTask>(taskId, { isCompleted: !isCompleted });
          return { data: toTask(record) };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_result, _error, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),

    // DELETE — single task
    deleteTask: builder.mutation<string, string>({
      queryFn: async (taskId) => {
        try {
          await pb.collection("tasks").delete(taskId);
          return { data: taskId };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_result, _error, taskId) => [
        { type: "Task", id: taskId },
      ],
    }),

    // DELETE — all tasks (batch delete)
    deleteAllTasks: builder.mutation<void, Task[]>({
      queryFn: async (tasks) => {
        try {
          await Promise.all(
            tasks.map((t) => pb.collection("tasks").delete(t.taskId)),
          );
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation,
  useDeleteAllTasksMutation,
} = todoApi;
