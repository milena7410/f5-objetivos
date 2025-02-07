import * as React from "react";

import { useTodos } from "~/store/reducers/todos/actions";
import { Task } from "~/core/domain/Task";

const useDraggableList = ({
  listType,
}: {
  listType: "list" | "completedList" | "uncompletedList";
}) => {
  const { todos, getTodoList, setSortedList } = useTodos();
  const [list, setList] = React.useState(todos[listType]);
  const [render, setRender] = React.useState(false);

  const handleSetList = (todoList: Task[]) => {
    setList(todoList);
    setRender((prev) => !prev);
  };

  React.useEffect(() => {
    getTodoList();
  }, []);

  React.useEffect(() => {
    setSortedList([...list]);
  }, [render]);

  React.useEffect(() => {
    setList(todos[listType]);
  }, [todos[listType]]);

  return { handleSetList, list, todos };
};

export { useDraggableList };
