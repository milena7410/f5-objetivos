import * as React from "react";
import { Text } from "react-native";

import * as Atoms from "~/components/atoms";
import { useTodos } from "~/store/reducers/todos/actions";
import { useThemeContext } from "~/contexts/ThemeContext";

export const GetTodoListEmpty = () => {
  const { todos } = useTodos();

  return (
    <Atoms.ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </Atoms.ThemedView>
  );
};

export const GetTodoList = () => {
  const { getTodoList, todos, deleteAllTasks } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Atoms.ThemedView>
      <Atoms.ThemedButton title="DELETE ALL" onPress={deleteAllTasks} />
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </Atoms.ThemedView>
  );
};

export const CreateTodo = () => {
  const { addTodo, todos } = useTodos();
  React.useEffect(() => {
    addTodo({ title: "New TODO", userId: 211 });
  }, []);
  return (
    <Atoms.ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </Atoms.ThemedView>
  );
};

export const NotFound = ({ id }: { id: number }) => {
  const { todos, getTodo } = useTodos();
  React.useEffect(() => {
    getTodo(id);
  }, [id]);
  return (
    <Atoms.ThemedView>
      {!!todos.error && <Text>{todos.error}</Text>}
    </Atoms.ThemedView>
  );
};

export const DeleteTask = ({ id }: { id: number }) => {
  const { todos, deleteTask, getTodoList } = useTodos();
  const first = React.useRef(true);
  React.useEffect(() => {
    getTodoList().finally(() =>
      deleteTask(id)
        .unwrap()
        .catch(() => {})
    );
  }, [id]);

  return (
    <Atoms.ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
      {!!todos.error && <Text>{todos.error}</Text>}
    </Atoms.ThemedView>
  );
};

export const CompleteTask = ({
  id,
  method,
}: {
  id: number;
  method: "completeTask" | "undoCompletedTask";
}) => {
  const { todos, getTodoList, ...todoHook } = useTodos();
  React.useEffect(() => {
    getTodoList().finally(() =>
      todoHook[method](id)
        .unwrap()
        .catch(() => {})
    );
  }, [id]);
  const { colorScheme } = useThemeContext();
  const task = todos.list.find((task) => task.id === id);

  return (
    <Atoms.ThemedView>
      <Text>{task?.completed ? "COMPLETED" : "NOT_COMPLETED"}</Text>
      {!!todos.error && <Text>{todos.error}</Text>}
    </Atoms.ThemedView>
  );
};

export const EditTask = ({ id, title }: { id: number; title: string }) => {
  const { getTodoList, todos, editTask } = useTodos();

  React.useEffect(() => {
    getTodoList();
  }, []);

  const task = todos.list.find((task) => task.id === id);

  if (!task) {
    return null;
  }
  return (
    <Atoms.ThemedView>
      <Text>{task?.title}</Text>
      <Atoms.ThemedButton
        title="EDIT"
        onPress={() => editTask({ ...task, title })}
      />
      {!!todos.error && <Text>{todos.error}</Text>}
    </Atoms.ThemedView>
  );
};
