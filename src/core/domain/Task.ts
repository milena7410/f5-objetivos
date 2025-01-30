export interface TaskDTO {
  id?: number;
  completed?: boolean;
  userId: number;
  title: string;
}

export interface Task extends Required<TaskDTO> {}

export const taskBuilder = (task: TaskDTO): Task => {
  const generateId = () => {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
  };

  return {
    ...task,
    id: task.id || generateId(),
    completed: !!task.completed,
  };
};

export const toJSON = (task: TaskDTO) => {
  const stringValue = { ...task };
  delete stringValue.id;
  return JSON.stringify(stringValue);
};
