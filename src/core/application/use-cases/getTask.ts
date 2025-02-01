import { TaskGateway } from "~/core/infra/TaskGateway";

const getTask = async (taskGateway: TaskGateway, id: number) => {
  return taskGateway.getTask(id);
};

export { getTask };
