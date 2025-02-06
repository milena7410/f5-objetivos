import * as React from "react";

import * as Molecules from "~/components/molecules";
import * as Organism from "~/components/organism";
import * as Atoms from "~/components/atoms";
import { useTodos } from "~/store/reducers/todos/actions";
import { Task } from "~/core/domain/Task";

const Uncompleted = () => {
  const { todos, getTodoList } = useTodos();
  const [list, setList] = React.useState(todos.uncompletedList);

  const handleSetList = (todoList: Task[]) => {
    setList(todoList);
  };

  React.useEffect(() => {
    getTodoList();
  }, []);

  React.useEffect(() => {
    setList(todos.uncompletedList);
  }, [todos.uncompletedList]);
  const { length } = todos.uncompletedList;
  return (
    <Atoms.ThemedView className="flex-1">
      <Molecules.Welcome
        title="Tarefas a fazer"
        subtitle={`Você tem ${length} tarefas a fazer`}
        emptySubtitle="Você não tem tarefas em aberto"
        isEmpty={!length}
      />
      <Organism.DraggableList list={list} setList={handleSetList} />
    </Atoms.ThemedView>
  );
};

export default Uncompleted;
