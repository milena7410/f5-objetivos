import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useAppSelector } from "~/store/hooks/redux";
import { useTodos } from "~/store/reducers/todos/actions";
import { FakeReduxProvider } from "../__mocks__/FakeProvider";
import { ThemedView } from "~/components/ThemedView";
import { useColorScheme } from "~/hooks/useColorScheme.web";

const GetTodoListEmpty = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView lightColor="green" darkColor="gray">
        {list.map((todo) => (
          <Text key={todo.id}>{todo.title}</Text>
        ))}
      </ThemedView>
    </ThemeProvider>
  );
};

const GetTodoList = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  const { getTodoList } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);
  return (
    <ThemedView>
      {list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </ThemedView>
  );
};

const CreateTodo = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  const { addTodo } = useTodos();
  React.useEffect(() => {
    addTodo({ title: "New TODO", userId: 211 });
  }, []);
  return (
    <ThemedView>
      {list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </ThemedView>
  );
};

const NotFound = ({ id }: { id: number }) => {
  const { todos, getTodo } = useTodos();
  React.useEffect(() => {
    getTodo(id);
  }, [id]);
  return <ThemedView>{todos.error && <Text>{todos.error}</Text>}</ThemedView>;
};

describe("Redux TodoList", () => {
  const FIST_TITLE = "ut quas possimus exercitationem sint voluptates";
  it("should render a list of todos correctly", async () => {
    render(
      <FakeReduxProvider>
        <GetTodoList />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(
        screen.getByText(
          "temporibus atque distinctio omnis eius impedit tempore molestias pariatur"
        )
      ).toBeTruthy();
      expect(screen.getByText(FIST_TITLE)).toBeTruthy();
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should not render anything if the todo list is empty", () => {
    const { queryByRole, toJSON } = render(
      <FakeReduxProvider>
        <GetTodoListEmpty />
      </FakeReduxProvider>
    );
    expect(toJSON()).toMatchSnapshot();
    expect(queryByRole("text")).toBeFalsy();
  });

  it("should create a new Task ", async () => {
    render(
      <FakeReduxProvider>
        <CreateTodo />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("New TODO")).toBeTruthy();
    });
  });

  it("should throw error if not exists", async () => {
    render(
      <FakeReduxProvider>
        <NotFound id={0} />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("not found")).toBeTruthy();
    });
  });
});
