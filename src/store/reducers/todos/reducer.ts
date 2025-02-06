import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "~/core/domain/Task";
import * as thunk from "./thunk";

type TodoReducer = {
  state: "idle" | "pending" | "success" | "error";
  list: Task[];
  completedList: Task[];
  uncompletedList: Task[];
  selectedTask?: Task;
  error?: string;
};

const initialState: TodoReducer = {
  state: "idle",
  list: [],
  completedList: [],
  uncompletedList: [],
  error: "",
};
const fillCompletedAndUncompletedTasks = (
  state: TodoReducer,
  newList: Task[]
) => {
  state.list = newList;
  const [completed, uncompleted] = state.list.reduce<Task[][]>(
    (acc, task) => {
      if (task.completed) {
        acc[0].push(task);
        return acc;
      }
      acc[1].push(task);
      return acc;
    },
    [[], []]
  );
  state.completedList = completed;
  state.uncompletedList = uncompleted;
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
      fillCompletedAndUncompletedTasks(state, actions.payload);
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.createTask.fulfilled, (state, actions) => {
      state.list = [actions.payload, ...state.list];
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.deleteTask.fulfilled, (state, actions) => {
      const id = actions.payload;
      const index = state.list.findIndex((task) => id === task.id);
      state.list.splice(index, 1);
      fillCompletedAndUncompletedTasks(state, state.list);
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
        fillCompletedAndUncompletedTasks(state, state.list);
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
