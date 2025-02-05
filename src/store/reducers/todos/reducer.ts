import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "~/core/domain/Task";
import * as thunk from "./thunk";

type TodoReducer = {
  state: "idle" | "pending" | "success" | "error";
  list: Task[];
  selectedTask?: Task;
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
  reducers: {
    selectTask: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.selectedTask = id
        ? state.list.find((task) => task.id === id)
        : undefined;
    },
    unSelectTask: (state) => {
      state.selectedTask = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunk.getTasks.fulfilled, (state, actions) => {
      state.list = actions.payload;
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.createTask.fulfilled, (state, actions) => {
      state.list = [...state.list, actions.payload];
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.deleteTask.fulfilled, (state, actions) => {
      const id = actions.payload;
      const index = state.list.findIndex((task) => id === task.id);
      state.list.splice(index, 1);
      state.state = "success";
      state.selectedTask = undefined;
      state.error = "";
    });
    builder.addMatcher(
      isAnyOf(thunk.completeTask.fulfilled, thunk.undoCompletedTask.fulfilled),
      (state, actions) => {
        const task = actions.payload;
        const index = state.list.findIndex(({ id }) => id === task.id);
        state.list.splice(index, 1, task);
        state.selectedTask =
          state.selectedTask?.id === task.id ? task : state.selectedTask;
        state.state = "success";
        state.error = "";
      }
    );
    builder.addMatcher(
      isAnyOf(
        thunk.undoCompletedTask.pending,
        thunk.completeTask.pending,
        thunk.getTasks.pending,
        thunk.createTask.pending,
        thunk.deleteTask.pending
      ),
      (state) => {
        state.state = "pending";
        state.error = "";
      }
    );
    builder.addMatcher(
      isAnyOf(
        thunk.undoCompletedTask.rejected,
        thunk.completeTask.rejected,
        thunk.getTasks.rejected,
        thunk.createTask.rejected,
        thunk.deleteTask.rejected
      ),
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
