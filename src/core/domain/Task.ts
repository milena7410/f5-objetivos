export interface TaskDTO {
  id?: number;
  completed?: boolean;
  userId: number;
  title: string;
}

export interface Task extends Required<TaskDTO> {}

export const taskBuilder = (task: TaskDTO): Task => {
  const generateId = () => {
    const Crypto = require("expo-crypto");
    const random = Crypto.getRandomBytes(8).join("");
    return random;
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
