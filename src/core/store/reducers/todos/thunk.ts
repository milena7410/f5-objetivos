import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTask } from "~/core/application/use-cases/createTask";
import { getTodoList } from "~/core/application/use-cases/getTodoList";

import type { TaskDTO } from "~/core/domain/Task";
import { api } from "~/core/infra/adapters/httpClient";
import { tasksGatewayHttp } from "~/core/infra/TaskGatewayHttp";

export const getTasks = createAsyncThunk("@todos/getTasks", async () => {
  const taskGateway = tasksGatewayHttp(api);
  const list = getTodoList(taskGateway);
  return list;
});

export const addTask = createAsyncThunk(
  "@todos/addTask",
  async (task: TaskDTO) => {
    const taskGateway = tasksGatewayHttp(api);
    const newTask = createTask(taskGateway, task);
    return newTask;
  }
);
