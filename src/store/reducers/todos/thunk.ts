import { createAsyncThunk } from "@reduxjs/toolkit";
import * as useCases from "~/core/application/use-cases/";

import type { Task, TaskDTO } from "~/core/domain/Task";
import { api } from "~/core/infra/adapters/httpClient";
import { tasksGatewayHttp } from "~/core/infra/TaskGatewayHttp";
import { TaskGateway } from "~/core/infra/TaskGateway";
import { RootState } from "~/store";

type ThunkAPIExtras = { taskGateway: TaskGateway };

type AppAsyncThunkConfig = {
  state: RootState;
  extra: ThunkAPIExtras;
};

export const thunk = createAsyncThunk.withTypes<AppAsyncThunkConfig>();

export const getTask = thunk(
  "@todos/getTasks",
  async (id: number, { extra }) => {
    const { taskGateway } = extra;
    const list = useCases.getTask(taskGateway, id);
    return list;
  }
);

export const getTasks = thunk(
  "@todos/getTasks",
  async (_, { extra, getState }) => {
    const { isFirstEntry } = getState().todos;
    // bypass
    if (!isFirstEntry) {
      return [];
    }
    const list = useCases.getTodoList(tasksGatewayHttp(api));
    return list;
  }
);

export const createTask = thunk(
  "@todos/createTask",
  async (task: TaskDTO, { extra }) => {
    const { taskGateway } = extra;
    const newTask = useCases.createTask(taskGateway, task);
    return newTask;
  }
);

export const editTask = thunk(
  "@todos/editTask",
  async (task: Task, { extra }) => {
    const { taskGateway } = extra;
    const newTask = useCases.editTask(taskGateway, task);
    return newTask;
  }
);

export const completeTask = thunk(
  "@todos/completeTask",
  async (id: number, { extra, getState }) => {
    const { todos } = getState();
    const { taskGateway } = extra;
    const todo = todos.list.find((task) => task.id === id);
    if (!todo) {
      throw new Error("not found");
    }
    return useCases.completeTask(taskGateway, todo);
  }
);

export const undoCompletedTask = thunk(
  "@todos/undoCompletedTask",
  async (id: number, { extra, getState }) => {
    const { todos } = getState();
    const { taskGateway } = extra;
    const todo = todos.list.find((task) => task.id === id);
    if (!todo) {
      throw new Error("not found");
    }
    return useCases.undoCompletedTask(taskGateway, todo);
  }
);

export const deleteTask = thunk(
  "@todos/deleteTask",
  async (id: number, { extra }) => {
    const { taskGateway } = extra;
    await useCases.deleteTask(taskGateway, id);
    return id;
  }
);

export const deleteAllTasks = thunk(
  "@todos/deleteAllTasks",
  async (_, { extra }) => {
    const { taskGateway } = extra;
    return await useCases.deleteAllTasks(taskGateway);
  }
);
