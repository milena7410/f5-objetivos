import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";

import { FakeReduxProvider } from "../__mocks__/FakeProvider";
import { TODO_LIST_MOCK } from "../infra/TaskGatewayInMemory";
import {
  CompleteTask,
  CreateTodo,
  DeleteTask,
  GetTodoList,
  GetTodoListEmpty,
  NotFound,
} from "../__mocks__/FakeApp";

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

  it("should throw error when it tries complete a completed task", async () => {
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
});
