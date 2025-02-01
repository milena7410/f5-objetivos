import { TaskGateway } from "~/core/infra/TaskGateway";

const deleteTask = async (taskGateway: TaskGateway, id: number) => {
  return taskGateway.deleteTask(id);
};

export { deleteTask };
