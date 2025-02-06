import { Task } from "~/core/domain/Task";
import { TaskGateway } from "~/core/infra/TaskGateway";

const editTask = async (taskGateway: TaskGateway, task: Task) => {
  return taskGateway.editTask(task);
};

export { editTask };
