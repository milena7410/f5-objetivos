import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text } from "react-native";

import { ThemedView } from "~/components/ThemedView";
import { useTodos } from "~/store/reducers/todos/actions";
import { useThemeContext } from "~/contexts/ThemeContext";

export const GetTodoListEmpty = () => {
  const { todos } = useTodos();
  const { colorScheme } = useThemeContext();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView lightColor="green" darkColor="gray">
        {todos.list.map((todo) => (
          <Text key={todo.id}>{todo.title}</Text>
        ))}
      </ThemedView>
    </ThemeProvider>
  );
};

export const GetTodoList = () => {
  const { getTodoList, todos } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);
  return (
    <ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </ThemedView>
  );
};

export const CreateTodo = () => {
  const { addTodo, todos } = useTodos();
  React.useEffect(() => {
    addTodo({ title: "New TODO", userId: 211 });
  }, []);
  return (
    <ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </ThemedView>
  );
};

export const NotFound = ({ id }: { id: number }) => {
  const { todos, getTodo } = useTodos();
  React.useEffect(() => {
    getTodo(id);
  }, [id]);
  return <ThemedView>{!!todos.error && <Text>{todos.error}</Text>}</ThemedView>;
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
    <ThemedView>
      {todos.list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
      {!!todos.error && <Text>{todos.error}</Text>}
    </ThemedView>
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView lightColor="green" darkColor="gray">
        <Text>{task?.completed ? "COMPLETED" : "NOT_COMPLETED"}</Text>
        {!!todos.error && <Text>{todos.error}</Text>}
      </ThemedView>
    </ThemeProvider>
  );
};
