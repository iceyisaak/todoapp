import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Task, type TodoState } from "../types/todo";

const initialState: TodoState = {
  tasks: [], // kept for type compatibility, source of truth is now RTK Query cache
  isLoading: false,
  isEditing: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    selectTaskToEdit(state, action: PayloadAction<Task>) {
      state.isEditing = action.payload;
    },
    clearEditing(state) {
      state.isEditing = null;
    },
  },
});

export const { selectTaskToEdit, clearEditing } = todoSlice.actions;
export default todoSlice.reducer;
