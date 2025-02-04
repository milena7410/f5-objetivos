import * as React from "react";

import * as Organism from "~/components/organism";
import { useTodos } from "~/store/reducers/todos/actions";
import { Task } from "~/core/domain/Task";

const App = () => {
  const { todos, getTodoList } = useTodos();
  const [list, setList] = React.useState(todos.list);

  const handleSetList = (todoList: Task[]) => {
    setList(todoList);
  };

  React.useEffect(() => {
    getTodoList();
  }, []);

  React.useEffect(() => {
    setList(todos.list);
  }, [todos.list]);

  return <Organism.DraggableList list={list} setList={handleSetList} />;
};

export default App;
