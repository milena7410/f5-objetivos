import { createAsyncThunk, Dispatch, GetThunkAPI } from "@reduxjs/toolkit";
import { createTask } from "~/core/application/use-cases/createTask";
import { getTodoList } from "~/core/application/use-cases/getTodoList";

import type { TaskDTO } from "~/core/domain/Task";
import { RootState } from "../..";
import { TaskGateway } from "~/core/infra/TaskGateway";

type ThunkAPIExtras = { taskGateway: TaskGateway };

type AppAsyncThunkConfig = {
  state: RootState;
  extra?: ThunkAPIExtras;
};

export const thunk = createAsyncThunk.withTypes<AppAsyncThunkConfig>();

export const getTasks = thunk("@todos/getTasks", async (_, { extra }) => {
  const { taskGateway } = extra as ThunkAPIExtras;
  const list = getTodoList(taskGateway);
  return list;
});

export const addTask = thunk(
  "@todos/addTask",
  async (task: TaskDTO, { extra }) => {
    const { taskGateway } = extra as ThunkAPIExtras;
    const newTask = createTask(taskGateway, task);
    return newTask;
  }
);
