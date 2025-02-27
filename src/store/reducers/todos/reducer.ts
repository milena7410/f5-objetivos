import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import { Task } from "~/core/domain/Task";
import * as thunk from "./thunk";
import { RootState } from "~/store";
import { TODO_LIST } from "~/core/infra/TaskGatewayInMemory";

type TodoReducer = {
  state: "idle" | "pending" | "success" | "error";
  isFirstEntry: boolean;
  list: Task[];
  completedList: Task[];
  uncompletedList: Task[];
  selectedTask?: Task;
  error?: string;
};

export interface ActionRehydrate {
  type: string;
  payload?: RootState;
}

const initialState: TodoReducer = {
  isFirstEntry: true,
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
    setSortedList: (state, action: PayloadAction<Task[]>) => {
      const newList = action.payload;

      if (newList.length === state.list.length) {
        fillCompletedAndUncompletedTasks(state, newList);
        return;
      }

      const sortedTask = state.list.reduce<Task[]>((acc, task) => {
        const taskShift = newList[0];
        if (!taskShift) {
          acc.push(task);
          return acc;
        }
        if (taskShift.completed && task.completed) {
          acc.push(taskShift);
          newList.shift();
          return acc;
        }
        if (!taskShift.completed && !task.completed) {
          acc.push(taskShift);
          newList.shift();
          return acc;
        }
        acc.push(task);
        return acc;
      }, []);
      fillCompletedAndUncompletedTasks(state, sortedTask);
    },
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
    builder.addCase(thunk.createTask.fulfilled, (state, actions) => {
      state.list = [actions.payload, ...state.list];
      fillCompletedAndUncompletedTasks(state, state.list);
      state.state = "success";
      state.error = "";
    });
    builder.addCase(thunk.editTask.fulfilled, (state, actions) => {
      const task = actions.payload;
      const index = state.list.findIndex(({ id }) => id === task.id);
      state.list.splice(index, 1, task);
      state.selectedTask = task;
      fillCompletedAndUncompletedTasks(state, state.list);
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
    builder.addCase(REHYDRATE, (state, action) => {
      const typeAction = action as ActionRehydrate;
      const currentList = typeAction.payload?.todos.list;
      if (currentList) {
        TODO_LIST.length = 0;
        currentList.forEach((value) => {
          TODO_LIST.push(value);
        });
      }
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
      isAnyOf(thunk.getTasks.fulfilled, thunk.deleteAllTasks.fulfilled),
      (state, actions) => {
        state.state = "success";
        state.error = "";
        // bypass
        if (
          state.isFirstEntry ||
          actions.type === thunk.deleteAllTasks.fulfilled.toString()
        ) {
          state.isFirstEntry = false;
          fillCompletedAndUncompletedTasks(state, actions.payload);
        }
      }
    );
    builder.addMatcher(
      isAnyOf(
        thunk.completeTask.pending,
        thunk.createTask.pending,
        thunk.deleteAllTasks.pending,
        thunk.deleteTask.pending,
        thunk.editTask.pending,
        thunk.getTasks.pending,
        thunk.undoCompletedTask.pending
      ),
      (state) => {
        state.state = "pending";
        state.error = "";
      }
    );
    builder.addMatcher(
      isAnyOf(
        thunk.completeTask.rejected,
        thunk.createTask.rejected,
        thunk.deleteAllTasks.rejected,
        thunk.deleteTask.rejected,
        thunk.editTask.rejected,
        thunk.getTasks.rejected,
        thunk.undoCompletedTask.rejected
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
