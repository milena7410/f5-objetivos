import type { TaskGateway } from "../infra/TaskGateway";

import {
  TaskGatewayInMemory,
  TODO_LIST_MOCK,
} from "../infra/TaskGatewayInMemory";
import * as useCases from "../application/use-cases";
import { toJSON } from "../domain/Task";

describe("Todo Gateway", () => {
  const [FIRST_TASK, SECOND_TASK_COMPLETED] = TODO_LIST_MOCK;
  let taskGateway: TaskGateway;
  beforeEach(() => {
    taskGateway = TaskGatewayInMemory();
  });

  it("should get all todos", async () => {
    const list = await useCases.getTodoList(taskGateway);
    expect(list.length).toBeGreaterThan(0);
  });

  it("should get todo by id", async () => {
    const id = FIRST_TASK.id;
    const task = await useCases.getTask(taskGateway, id);
    expect(task.id).toBe(id);
  });

  it("should throw error if not exists", async () => {
    const id = 3000;
    const promise = useCases.getTask(taskGateway, id);
    await expect(promise).rejects.toMatchObject({
      message: "not found",
    });
  });

  it("should create a new todo", async () => {
    const taskDTO = {
      userId: 10,
      title:
        "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
    };
    const newTask = await useCases.createTask(taskGateway, taskDTO);
    const task = await useCases.getTask(taskGateway, newTask.id);
    expect(newTask).toHaveProperty("id");
    expect(newTask.id).toBe(task.id);
    expect(JSON.parse(toJSON(task))).not.toHaveProperty("id");
  });

  it("should delete a todo by id", async () => {
    const id = FIRST_TASK.id;
    await useCases.deleteTask(taskGateway, id);
    const promise = useCases.getTask(taskGateway, id);
    await expect(promise).rejects.toMatchObject({
      message: "not found",
    });
  });

  it("should mark task as completed", async () => {
    const task = FIRST_TASK;
    await useCases.completeTask(taskGateway, task);
    const completedTask = await useCases.getTask(taskGateway, task.id);
    expect(completedTask.completed).toBe(true);
  });

  it("should throw error when try complete a completed task", async () => {
    const task = SECOND_TASK_COMPLETED;
    const promise = useCases.completeTask(taskGateway, task);
    await expect(promise).rejects.toMatchObject({
      message: "task already completed",
    });
  });

  it("should undo completed task", async () => {
    const task = SECOND_TASK_COMPLETED;
    await useCases.undoCompletedTask(taskGateway, task);
    const undoTask = await useCases.getTask(taskGateway, task.id);
    expect(undoTask.completed).toBe(false);
  });

  it("should throw error when try undo completed task that it isn't completed", async () => {
    const task = FIRST_TASK;
    const promise = useCases.undoCompletedTask(taskGateway, task);
    await expect(promise).rejects.toMatchObject({
      message: "task not completed",
    });
  });
});
