import { TaskGateway } from "~/core/infra/TaskGateway";

const getTodoList = async (taskGateway: TaskGateway) => {
  return taskGateway.getTasks();
};

export { getTodoList };
