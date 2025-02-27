import { Task, taskBuilder, TaskDTO } from "../domain/Task";
import { TaskGateway } from "./TaskGateway";

export const TODO_LIST_MOCK = [
  {
    userId: 10,
    id: 191,
    title:
      "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
    completed: true,
  },
  {
    userId: 10,
    id: 192,
    title: "ut quas possimus exercitationem sint voluptates",
    completed: false,
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
    title: "consequuntur aut ut fugit similique",
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
export let TODO_LIST: Task[] = JSON.parse(JSON.stringify(TODO_LIST_MOCK));

export const TaskGatewayInMemory = (isTest?: boolean): TaskGateway => {
  if (isTest) {
    TODO_LIST = JSON.parse(JSON.stringify(TODO_LIST_MOCK));
  }

  const getTasks = async (): Promise<Task[]> => TODO_LIST.map(taskBuilder);

  const createTask = async (task: TaskDTO): Promise<Task> => {
    const newTask = taskBuilder(task);
    TODO_LIST = [newTask, ...TODO_LIST];
    return newTask;
  };

  const getTask = async (id: number): Promise<Task> => {
    const task = TODO_LIST.find((t) => t.id === id);
    if (!task) {
      throw new Error("not found");
    }
    return taskBuilder(task);
  };

  const editTask = async (task: Task) => {
    const index = TODO_LIST.findIndex((t) => t.id === task.id);
    TODO_LIST.splice(index, 0, task);
    return TODO_LIST[index];
  };

  const deleteTask = async (id: number) => {
    const taskIndex = TODO_LIST.findIndex((t) => t.id === id);
    if (taskIndex < 0) {
      throw new Error("not found");
    }
    TODO_LIST.splice(taskIndex, 1);
  };

  const completeTask = async (task: Task) => {
    const index = TODO_LIST.findIndex((t) => t.id === task.id);
    const currentTask = TODO_LIST[index];
    if (!currentTask) {
      throw new Error("not found");
    }
    const taskEntity = taskBuilder({ ...currentTask, completed: true });
    TODO_LIST.splice(index, 0, taskEntity);
    return taskEntity;
  };

  const undoCompletedTask = async (task: Task) => {
    const index = TODO_LIST.findIndex((t) => t.id === task.id);
    const currentTask = TODO_LIST[index];
    if (!currentTask) {
      throw new Error("not found");
    }
    const taskEntity = taskBuilder({ ...currentTask, completed: false });
    TODO_LIST.splice(index, 0, taskEntity);
    return taskEntity;
  };

  const deleteAllTasks = async () => {
    TODO_LIST = [];
    return TODO_LIST;
  };

  return {
    getTasks,
    createTask,
    getTask,
    editTask,
    deleteTask,
    completeTask,
    undoCompletedTask,
    deleteAllTasks,
  };
};
