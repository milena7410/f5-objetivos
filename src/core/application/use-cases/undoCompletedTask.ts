import { Task } from "~/core/domain/Task";
import { TaskGateway } from "~/core/infra/TaskGateway";

const undoCompletedTask = async (taskGateway: TaskGateway, task: Task) => {
  if (!task.completed) {
    throw new Error("task not completed");
  }
  return taskGateway.undoCompletedTask(task);
};

export { undoCompletedTask };
