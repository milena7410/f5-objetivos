import { Task } from "~/core/domain/Task";
import { TaskGateway } from "~/core/infra/TaskGateway";

const completeTask = async (taskGateway: TaskGateway, task: Task) => {
  if (task.completed) {
    throw new Error("task already completed");
  }
  return taskGateway.completeTask(task);
};

export { completeTask };
