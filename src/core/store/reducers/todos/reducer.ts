import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { Task } from "~/core/domain/Task";
import * as thunk from "./thunk";

type TodoReducer = {
  state: "idle" | "pending" | "success" | "error";
  list: Task[];
  error?: string;
};

const initialState: TodoReducer = {
  state: "idle",
  list: [],
  error: "",
};

const todoSlice = createSlice({
  name: "@todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getTasks.fulfilled, (state, actions) => {
      state.list = actions.payload;
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.addTask.fulfilled, (state, actions) => {
      state.list = [...state.list, actions.payload];
      state.state = "success";
      state.error = "";
    });
    builder.addMatcher(
      isAnyOf(thunk.getTasks.pending, thunk.addTask.pending),
      (state) => {
        state.state = "error";
        state.error = "";
      }
    );
    builder.addMatcher(
      isAnyOf(thunk.getTasks.rejected, thunk.addTask.rejected),
      (state, actions) => {
        state.state = "error";
        state.error = actions.error.message;
      }
    );
  },
});

const todoReducer = todoSlice.reducer;
const actions = todoSlice.actions;
export { todoReducer, actions };
