import * as React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react-native";

import { FakeReduxProvider } from "../__mocks__/FakeProvider";
import {
  TaskGatewayInMemory,
  TODO_LIST_MOCK,
} from "~/core/infra/TaskGatewayInMemory";
import {
  CompleteTask,
  CreateTodo,
  DeleteTask,
  EditTask,
  GetTodoList,
  GetTodoListEmpty,
  NotFound,
} from "../__mocks__/FakeApp";
import * as tasksGatewayHttp from "~/core/infra/TaskGatewayHttp";

describe("Redux TodoList", () => {
  const [COMPLETED_TASK, UNCOMPLETED_TASK] = TODO_LIST_MOCK;
  beforeAll(() => {
    jest
      .spyOn(tasksGatewayHttp, "tasksGatewayHttp")
      .mockImplementation(TaskGatewayInMemory);
  });
  it("should render a list of todos correctly", async () => {
    render(
      <FakeReduxProvider>
        <GetTodoList />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(UNCOMPLETED_TASK.title)).toBeTruthy();
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
      expect(screen.getByText(UNCOMPLETED_TASK.title)).toBeTruthy();
      expect(screen.getByText("not found")).toBeTruthy();
    });
  });

  it("should delete task", async () => {
    render(
      <FakeReduxProvider>
        <DeleteTask id={UNCOMPLETED_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(UNCOMPLETED_TASK.title)).toBeFalsy();
      expect(screen.queryByText("not found")).toBeFalsy();
    });
  });

  it("should complete task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="completeTask" id={UNCOMPLETED_TASK.id} />
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
        <CompleteTask method="completeTask" id={COMPLETED_TASK.id} />
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
        <CompleteTask method="undoCompletedTask" id={COMPLETED_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("NOT_COMPLETED")).toBeTruthy();
      expect(screen.queryByText("task not completed")).toBeFalsy();
    });
  });

  it("should throw error when it tries complete a completed task", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="undoCompletedTask" id={UNCOMPLETED_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("NOT_COMPLETED")).toBeTruthy();
      expect(screen.getByText("task not completed")).toBeTruthy();
    });
  });
  it("should throw an error when it tries to manage the attribute 'completed' that is not found.", async () => {
    render(
      <FakeReduxProvider>
        <CompleteTask method="completeTask" id={1} />
        <CompleteTask method="undoCompletedTask" id={1} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("not found").length).toBe(2);
    });
  });

  it("should delete all tasks", async () => {
    render(
      <FakeReduxProvider>
        <GetTodoList />
      </FakeReduxProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(UNCOMPLETED_TASK.title)).toBeTruthy();
    });
    await waitFor(() => {
      const buttonDeleteAll = screen.getByText("DELETE ALL");
      fireEvent(buttonDeleteAll, "press");
      expect(screen.queryByText(UNCOMPLETED_TASK.title)).toBeFalsy();
    });
  });

  it("should edit task", async () => {
    const newTitle = "TASK EDITED";
    render(
      <FakeReduxProvider>
        <EditTask title={newTitle} id={UNCOMPLETED_TASK.id} />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(UNCOMPLETED_TASK.title)).toBeTruthy();
      expect(screen.queryByText(newTitle)).toBeFalsy();
      const buttonDeleteAll = screen.getByText("EDIT");
      fireEvent(buttonDeleteAll, "press");
    });
    await waitFor(() => {
      expect(screen.queryByText(UNCOMPLETED_TASK.title)).toBeFalsy();
      expect(screen.getByText(newTitle)).toBeTruthy();
    });
  });

  it("should order list", async () => {
    render(
      <FakeReduxProvider>
        <GetTodoList />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      const rows = screen.getAllByTestId("row");
      expect(within(rows[0]).queryByText(TODO_LIST_MOCK[0].title)).toBeTruthy();
      expect(within(rows[1]).queryByText(TODO_LIST_MOCK[1].title)).toBeTruthy();
      const sortList = screen.getByText("SET_LIST");
      fireEvent(sortList, "press");
    });
    await waitFor(() => {
      const rows = screen.getAllByTestId("row");
      expect(within(rows[1]).queryByText(TODO_LIST_MOCK[0].title)).toBeTruthy();
      expect(within(rows[0]).queryByText(TODO_LIST_MOCK[1].title)).toBeTruthy();
    });
  });

  it("should order list by completed and uncompleted", async () => {
    render(
      <FakeReduxProvider>
        <GetTodoList />
      </FakeReduxProvider>
    );

    await waitFor(() => {
      const rows = screen.getAllByTestId("row");
      expect(within(rows[0]).queryByText(TODO_LIST_MOCK[0].title)).toBeTruthy();
      expect(within(rows[1]).queryByText(TODO_LIST_MOCK[1].title)).toBeTruthy();
      expect(within(rows[2]).queryByText(TODO_LIST_MOCK[2].title)).toBeTruthy();
      const sortList = screen.getByText("SET_COMPLETED");
      fireEvent(sortList, "press");
    });
    await waitFor(() => {
      const rows = screen.getAllByTestId("row");
      expect(within(rows[2]).queryByText(TODO_LIST_MOCK[0].title)).toBeTruthy();
      expect(within(rows[1]).queryByText(TODO_LIST_MOCK[1].title)).toBeTruthy();
      expect(within(rows[0]).queryByText(TODO_LIST_MOCK[2].title)).toBeTruthy();
    });
  });
});
