import { useCallback } from "react";

import { TaskDTO } from "~/core/domain/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addTask, getTasks } from "./thunk";

export const useTodos = () => {
  const todos = useAppSelector(({ todos }) => todos);

  const dispatch = useAppDispatch();

  const getTodoList = useCallback(() => {
    dispatch(getTasks());
  }, []);

  const addTodo = useCallback((todo: TaskDTO) => {
    dispatch(addTask(todo));
  }, []);

  return { todos, getTodoList, addTodo };
};
