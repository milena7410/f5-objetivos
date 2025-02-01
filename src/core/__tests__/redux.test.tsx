import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useTodos } from "~/store/reducers/todos/actions";
import { FakeReduxProvider } from "../__mocks__/FakeProvider";
import { ThemedView } from "~/components/ThemedView";
import { useColorScheme } from "~/hooks/useColorScheme.web";
import { TODO_LIST_MOCK } from "../infra/TaskGatewayInMemory";

const GetTodoListEmpty = () => {
  const { todos } = useTodos();
  const colorScheme = useColorScheme();
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

const GetTodoList = () => {
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

const CreateTodo = () => {
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

const NotFound = ({ id }: { id: number }) => {
  const { todos, getTodo } = useTodos();
  React.useEffect(() => {
    getTodo(id);
  }, [id]);
  return <ThemedView>{!!todos.error && <Text>{todos.error}</Text>}</ThemedView>;
};

const DeleteTask = ({ id }: { id: number }) => {
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

const CompleteTask = ({
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
  const colorScheme = useColorScheme();
  const task = todos.list.find((task) => task.id === id);
  if (!task) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView lightColor="green" darkColor="gray">
        <Text>{task.completed ? "COMPLETED" : "NOT_COMPLETED"}</Text>
        {!!todos.error && <Text>{todos.error}</Text>}
      </ThemedView>
    </ThemeProvider>
  );
};
describe("Redux TodoList", () => {
  const [FIRST_TASK, SECOND_TASK_COMPLETED] = TODO_LIST_MOCK;
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
      expect(screen.getByText(FIRST_TASK.title)).toBeTruthy();
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

  it("should create a new Task and render", async () => {
    render(
      <FakeReduxProvider>
        <CreateTodo />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("New TODO")).toBeTruthy();
    });
  });

  it("should throw error if not exists and render error label", async () => {
    render(
      <FakeReduxProvider>
        <NotFound id={0} />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("not found")).toBeTruthy();
    });
  });

  it("should throw error if try delete task not exists", async () => {
    render(
      <FakeReduxProvider>
        <DeleteTask id={0} />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(FIRST_TASK.title)).toBeTruthy();
      expect(screen.getByText("not found")).toBeTruthy();
    });
  });

  it("should delete task", async () => {
    render(
      <FakeReduxProvider>
        <DeleteTask id={FIRST_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(FIRST_TASK.title)).toBeFalsy();
      expect(screen.queryByText("not found")).toBeFalsy();
    });
  });

  it("should complete task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="completeTask" id={FIRST_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("COMPLETED")).toBeTruthy();
      expect(screen.queryByText("task already completed")).toBeFalsy();
    });
  });

  it("should throw error if try complete a completed task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="completeTask" id={SECOND_TASK_COMPLETED.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("COMPLETED")).toBeTruthy();
      expect(screen.getByText("task already completed")).toBeTruthy();
    });
  });

  it("should undo completed task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask
          method="undoCompletedTask"
          id={SECOND_TASK_COMPLETED.id}
        />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("NOT_COMPLETED")).toBeTruthy();
      expect(screen.queryByText("task not completed")).toBeFalsy();
    });
  });
  it("should throw error if try complete a completed task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="undoCompletedTask" id={FIRST_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("NOT_COMPLETED")).toBeTruthy();
      expect(screen.getByText("task not completed")).toBeTruthy();
    });
  });
});
