import { TaskGateway } from "~/core/infra/TaskGateway";

const getTodoList = (taskGateway: TaskGateway) => {
  return taskGateway.getTasks();
};

export { getTodoList };
