import * as React from "react";

import * as thunk from "./thunk";
import { TaskDTO } from "~/core/domain/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export const useTodos = () => {
  const todos = useAppSelector(({ todos }) => todos);

  const dispatch = useAppDispatch();

  const getTodoList = React.useCallback(() => dispatch(thunk.getTasks()), []);

  const addTodo = React.useCallback(
    (todo: TaskDTO) => dispatch(thunk.createTask(todo)),
    []
  );

  const getTodo = React.useCallback(
    (id: number) => dispatch(thunk.getTask(id)),
    []
  );

  const deleteTask = React.useCallback(
    (id: number) => dispatch(thunk.deleteTask(id)),
    []
  );

  return { todos, getTodoList, addTodo, getTodo, deleteTask };
};
