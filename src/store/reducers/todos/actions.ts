import { useCallback } from "react";

import { TaskDTO } from "~/core/domain/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createTask, getTask, getTasks } from "./thunk";

export const useTodos = () => {
  const todos = useAppSelector(({ todos }) => todos);

  const dispatch = useAppDispatch();

  const getTodoList = useCallback(() => {
    dispatch(getTasks());
  }, []);

  const addTodo = useCallback((todo: TaskDTO) => {
    dispatch(createTask(todo));
  }, []);

  const getTodo = useCallback((id: number) => {
    dispatch(getTask(id));
  }, []);

  return { todos, getTodoList, addTodo, getTodo };
};
