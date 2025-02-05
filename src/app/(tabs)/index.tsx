import * as React from "react";

import * as Molecules from "~/components/molecules";
import * as Organism from "~/components/organism";
import * as Atoms from "~/components/atoms";
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

  return (
    <Atoms.ThemedView className="flex-1">
      <Molecules.Welcome totalTasksTodo={todos.list.length} />
      <Organism.DraggableList list={list} setList={handleSetList} />
    </Atoms.ThemedView>
  );
};

export default App;
