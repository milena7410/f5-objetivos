import { TaskGateway } from "~/core/infra/TaskGateway";

const getTask = (taskGateway: TaskGateway, id: number) => {
  return taskGateway.getTask(id);
};

export { getTask };
