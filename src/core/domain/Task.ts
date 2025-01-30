export interface TaskDTO {
  id?: number;
  completed?: boolean;
  userId: number;
  title: string;
}

export interface Task extends Required<TaskDTO> {
  toJSON(): string;
}

export const taskBuilder = (task: TaskDTO): Task => {
  const toJSON = () => {
    const stringValue = { ...task };
    delete stringValue.id;
    return JSON.stringify(stringValue);
  };
  const generateId = () => {
    const crypto = require("crypto");
    return crypto.randomBytes(16).toString("hex");
  };

  return {
    ...task,
    id: task.id || generateId(),
    completed: !!task.completed,
    toJSON,
  };
};
