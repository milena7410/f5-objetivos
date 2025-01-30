import type { TaskDTO } from "~/core/domain/Task";
import { TaskGateway } from "~/core/infra/TaskGateway";

const createTask = (taskGateway: TaskGateway, task: TaskDTO) => {
  return taskGateway.createTask(task);
};

export { createTask };
