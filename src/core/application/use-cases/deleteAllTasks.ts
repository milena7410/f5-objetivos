import { TaskGateway } from "~/core/infra/TaskGateway";

const deleteAllTasks = async (taskGateway: TaskGateway) => {
  return taskGateway.deleteAllTasks();
};

export { deleteAllTasks };
