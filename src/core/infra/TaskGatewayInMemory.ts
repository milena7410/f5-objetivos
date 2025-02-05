import { Task, taskBuilder, TaskDTO } from "../domain/Task";
import { TaskGateway } from "./TaskGateway";

export const TODO_LIST_MOCK = [
  {
    userId: 10,
    id: 191,
    title:
      "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
    completed: false,
  },
  {
    userId: 10,
    id: 192,
    title: "ut quas possimus exercitationem sint voluptates",
    completed: true,
  },
  {
    userId: 10,
    id: 193,
    title: "rerum debitis voluptatem qui eveniet tempora distinctio a",
    completed: true,
  },
  {
    userId: 10,
    id: 194,
    title: "sed ut vero sit molestiae",
    completed: false,
  },
  {
    userId: 10,
    id: 195,
    title: "rerum ex veniam mollitia voluptatibus pariatur",
    completed: true,
  },
  {
    userId: 10,
    id: 196,
    title:
      "consequuntur aut ut fugit similique dignissimos quo nobis earum saepe quis eius est sint explicabo numquam repellendus a magnam ",
    completed: true,
  },
  {
    userId: 10,
    id: 197,
    title: "dignissimos quo nobis earum saepe",
    completed: true,
  },
  {
    userId: 10,
    id: 198,
    title: "quis eius est sint explicabo",
    completed: true,
  },
  {
    userId: 10,
    id: 199,
    title: "numquam repellendus a magnam",
    completed: true,
  },
  {
    userId: 10,
    id: 200,
    title: "ipsam aperiam voluptates qui",
    completed: false,
  },
];
export const TaskGatewayInMemory = (): TaskGateway => {
  const TODO_LIST: Task[] = JSON.parse(JSON.stringify(TODO_LIST_MOCK));
  const getTasks = async (): Promise<Task[]> => TODO_LIST.map(taskBuilder);

  const createTask = async (task: TaskDTO): Promise<Task> => {
    const newTask = taskBuilder(task);
    TODO_LIST.push(newTask);
    return newTask;
  };

  const getTask = async (id: number): Promise<Task> => {
    const task = TODO_LIST.find((t) => t.id === id);
    if (!task) {
      throw new Error("not found");
    }
    return taskBuilder(task);
  };

  const deleteTask = async (id: number) => {
    const taskIndex = TODO_LIST.findIndex((t) => t.id === id);
    if (taskIndex < 0) {
      throw new Error("not found");
    }
    TODO_LIST.splice(taskIndex, 1);
  };

  const completeTask = async (task: Task) => {
    const currentTask = TODO_LIST.find((t) => t.id === task.id);
    if (!currentTask) {
      throw new Error("not found");
    }
    return taskBuilder({ ...currentTask, completed: true });
  };

  const undoCompletedTask = async (task: Task) => {
    const currentTask = TODO_LIST.find((t) => t.id === task.id);
    if (!currentTask) {
      throw new Error("not found");
    }
    return taskBuilder({ ...currentTask, completed: false });
  };

  return {
    getTasks,
    createTask,
    getTask,
    deleteTask,
    completeTask,
    undoCompletedTask,
  };
};
