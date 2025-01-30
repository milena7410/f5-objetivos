import type { TaskGateway } from "../infra/TaskGateway";

import { TaskGatewayInMemory } from "../infra/TaskGatewayInMemory";
import { createTask } from "../application/use-cases/createTask";
import { getTask } from "../application/use-cases/getTask";
import { getTodoList } from "../application/use-cases/getTodoList";

describe("Todo Gateway", () => {
  let taskGateway: TaskGateway;
  beforeEach(() => {
    taskGateway = TaskGatewayInMemory();
  });

  it("should get all todos", async () => {
    const withoutIde = {
      userId: 10,
      title:
        "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
      completed: true,
    };
    const list = await getTodoList(taskGateway);
    expect(list[0].toJSON()).toBe(JSON.stringify(withoutIde));
  });

  it("should get todo by id", async () => {
    const id = 199;
    const task = await getTask(taskGateway, id);
    expect(task.id).toBe(id);
  });

  it("should get error if not exists", async () => {
    const id = 3000;
    const promise = getTask(taskGateway, id);
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
    const newTask = await createTask(taskGateway, taskDTO);
    const task = await getTask(taskGateway, newTask.id);
    expect(newTask).toHaveProperty("id");
    expect(newTask.id).toBe(task.id);
  });
});
