import { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { Text, View } from "react-native";

import { useAppSelector } from "../../store/hooks/redux";
import { useTodos } from "../../store/reducers/todos/actions";
import { FakeReduxProvider } from "../__mocks__/FakeProvider";

const GetTodoListEmpty = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  return (
    <View>
      {list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </View>
  );
};

const GetTodoList = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  const { getTodoList } = useTodos();
  useEffect(() => {
    getTodoList();
  }, []);
  return (
    <View>
      {list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </View>
  );
};

const CreateTodo = () => {
  const { list } = useAppSelector(({ todos }) => todos);
  const { addTodo } = useTodos();
  useEffect(() => {
    addTodo({ title: "New TODO", userId: 211 });
  }, []);
  return (
    <View>
      {list.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </View>
  );
};

const NotFound = ({ id }: { id: number }) => {
  const { todos, getTodo } = useTodos();
  useEffect(() => {
    getTodo(id);
  }, [id]);
  return <View>{todos.error && <Text>{todos.error}</Text>}</View>;
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
