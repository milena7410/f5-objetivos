import { createAsyncThunk } from "@reduxjs/toolkit";
import * as useCases from "~/core/application/use-cases/";

import type { TaskDTO } from "~/core/domain/Task";
import { RootState } from "../..";
import { TaskGateway } from "~/core/infra/TaskGateway";

type ThunkAPIExtras = { taskGateway: TaskGateway };

type AppAsyncThunkConfig = {
  state: RootState;
  extra?: ThunkAPIExtras;
};

export const thunk = createAsyncThunk.withTypes<AppAsyncThunkConfig>();

export const getTask = thunk(
  "@todos/getTasks",
  async (id: number, { extra }) => {
    const { taskGateway } = extra as ThunkAPIExtras;
    const list = useCases.getTask(taskGateway, id);
    return list;
  }
);

export const getTasks = thunk("@todos/getTasks", async (_, { extra }) => {
  const { taskGateway } = extra as ThunkAPIExtras;
  const list = useCases.getTodoList(taskGateway);
  return list;
});

export const createTask = thunk(
  "@todos/createTask",
  async (task: TaskDTO, { extra }) => {
    const { taskGateway } = extra as ThunkAPIExtras;
    const newTask = useCases.createTask(taskGateway, task);
    return newTask;
  }
);

export const deleteTask = thunk(
  "@todos/deleteTask",
  async (id: number, { extra }) => {
    const { taskGateway } = extra as ThunkAPIExtras;
    await useCases.deleteTask(taskGateway, id);
    return id;
  }
);
