import { TaskGateway } from "~/core/infra/TaskGateway";

const deleteTask = (taskGateway: TaskGateway, id: number) => {
  return taskGateway.deleteTask(id);
};

export { deleteTask };
