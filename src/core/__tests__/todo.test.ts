import type { TaskGateway } from "../infra/TaskGateway";

import {
  TaskGatewayInMemory,
  TODO_LIST_MOCK,
} from "../infra/TaskGatewayInMemory";
import * as useCases from "../application/use-cases";
import { toJSON } from "../domain/Task";

describe("Todo Gateway", () => {
  const [COMPLETED_TASK, UNCOMPLETED_TASK] = TODO_LIST_MOCK;
  let taskGateway: TaskGateway;
  beforeEach(() => {
    taskGateway = TaskGatewayInMemory();
  });

  it("should get all todos", async () => {
    const list = await useCases.getTodoList(taskGateway);
    expect(list.length).toBeGreaterThan(0);
  });

  it("should get todo by id", async () => {
    const id = UNCOMPLETED_TASK.id;
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
      title: "NEW TODO",
    };
    const newTask = await useCases.createTask(taskGateway, taskDTO);
    const task = await useCases.getTask(taskGateway, newTask.id);
    expect(newTask).toHaveProperty("id");
    expect(newTask.id).toBe(task.id);
    expect(JSON.parse(toJSON(task))).not.toHaveProperty("id");
  });

  it("should delete a todo by id", async () => {
    const id = UNCOMPLETED_TASK.id;
    await useCases.deleteTask(taskGateway, id);
    const promise = useCases.getTask(taskGateway, id);
    await expect(promise).rejects.toMatchObject({
      message: "not found",
    });
  });

  it("should mark task as completed", async () => {
    const task = UNCOMPLETED_TASK;
    await useCases.completeTask(taskGateway, task);
    const completedTask = await useCases.getTask(taskGateway, task.id);
    expect(completedTask.completed).toBe(true);
  });

  it("should throw error when try complete a completed task", async () => {
    const task = COMPLETED_TASK;
    const promise = useCases.completeTask(taskGateway, task);
    await expect(promise).rejects.toMatchObject({
      message: "task already completed",
    });
  });

  it("should undo completed task", async () => {
    const task = COMPLETED_TASK;
    await useCases.undoCompletedTask(taskGateway, task);
    const undoTask = await useCases.getTask(taskGateway, task.id);
    expect(undoTask.completed).toBe(false);
  });

  it("should throw an error when trying to undo a task that isn't marked as completed.", async () => {
    const task = UNCOMPLETED_TASK;
    const promise = useCases.undoCompletedTask(taskGateway, task);
    await expect(promise).rejects.toMatchObject({
      message: "task not completed",
    });
  });

  it("should throw an error when it tries to manage the attribute 'completed' that is not found.", async () => {
    const task = UNCOMPLETED_TASK;
    await useCases.deleteTask(taskGateway, task.id);
    const promiseComplete = useCases.completeTask(taskGateway, task);
    const promiseUndoCompleted = useCases.undoCompletedTask(taskGateway, {
      ...task,
      completed: true,
    });
    expect(promiseComplete).rejects.toMatchObject({
      message: "not found",
    });
    expect(promiseUndoCompleted).rejects.toMatchObject({
      message: "not found",
    });
  });

  it("should delete all", async () => {
    await useCases.deleteAllTasks(taskGateway);
    const all = await useCases.getTodoList(taskGateway);
    expect(all.length).toBe(0);
  });

  it("should edit task", async () => {
    const title = "NEW TASK";
    let task = await useCases.getTask(taskGateway, UNCOMPLETED_TASK.id);
    expect(task.title).not.toBe(title);
    await useCases.editTask(taskGateway, { ...task, title });
    task = await useCases.getTask(taskGateway, UNCOMPLETED_TASK.id);
    expect(task.title).toBe(title);
  });
});
