import { HttpClient } from "../domain/HttpClient";
import { taskBuilder, TaskDTO, Task } from "../domain/Task";
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

  const deleteTask = async (id: number) => {
    await httpClient.delete<TaskDTO>(`/todos/${id}`);
  };

  const completeTask = async (task: Task) => {
    const updatedTask = await httpClient.put<Task>(
      `/todos/${task.id}/complete`,
      task
    );
    return taskBuilder(updatedTask);
  };

  const undoCompletedTask = async (task: Task) => {
    const updatedTask = await httpClient.put<Task>(
      `/todos/${task.id}/complete`,
      task
    );
    return taskBuilder(updatedTask);
  };

  const deleteAllTasks = async () => {
    return await httpClient.delete<Task>(`/todos/all`);
  };

  return {
    getTasks,
    createTask,
    getTask,
    deleteTask,
    completeTask,
    undoCompletedTask,
    deleteAllTasks,
  };
}
