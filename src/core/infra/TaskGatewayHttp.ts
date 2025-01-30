import { HttpClient } from "../domain/HttpClient";
import { taskBuilder, TaskDTO } from "../domain/Task";
import { TaskGateway } from "./TaskGateway";

export function tasksGatewayHttp(httpClient: HttpClient): TaskGateway {
  const getTasks = async () => {
    const todoList = await httpClient.get<TaskDTO[]>("/todos");
    const tasks = todoList.map((task) => taskBuilder(task));
    return tasks;
  };

  const getTask = async (id: number) => {
    const newTask = await httpClient.get<TaskDTO>(`/todos/${id}`);
    return taskBuilder(newTask);
  };

  const createTask = async (todo: TaskDTO) => {
    const newTask = await httpClient.post<TaskDTO>("/todos", todo);
    return taskBuilder(newTask);
  };

  return { getTasks, createTask, getTask };
}
