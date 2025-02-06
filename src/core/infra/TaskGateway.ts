import type { Task, TaskDTO } from "../domain/Task";

export interface TaskGateway {
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  createTask(todo: TaskDTO): Promise<Task>;
  completeTask(task: Task): Promise<Task>;
  undoCompletedTask(task: Task): Promise<Task>;
  deleteTask(id: number): Promise<void>;
  deleteAllTasks(): Promise<any[]>;
}
