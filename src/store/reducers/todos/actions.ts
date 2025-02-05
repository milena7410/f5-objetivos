import * as React from "react";

import * as thunk from "./thunk";
import { TaskDTO } from "~/core/domain/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { actions } from "./reducer";

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

  const completeTask = React.useCallback(
    (id: number) => dispatch(thunk.completeTask(id)),
    []
  );
  const undoCompletedTask = React.useCallback(
    (id: number) => dispatch(thunk.undoCompletedTask(id)),
    []
  );

  const deleteTask = React.useCallback(
    (id: number) => dispatch(thunk.deleteTask(id)),
    []
  );

  const selectTask = React.useCallback(
    (id: number) => dispatch(actions.selectTask(id)),
    []
  );

  const unSelectTask = React.useCallback(
    () => dispatch(actions.unSelectTask()),
    []
  );

  return {
    todos,
    unSelectTask,
    selectTask,
    getTodoList,
    addTodo,
    getTodo,
    deleteTask,
    completeTask,
    undoCompletedTask,
  };
};
