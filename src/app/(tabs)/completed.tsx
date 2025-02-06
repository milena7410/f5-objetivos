import * as React from "react";

import * as Molecules from "~/components/molecules";
import * as Organism from "~/components/organism";
import * as Atoms from "~/components/atoms";
import { useTodos } from "~/store/reducers/todos/actions";
import { Task } from "~/core/domain/Task";

const Completed = () => {
  const { todos, getTodoList } = useTodos();
  const [list, setList] = React.useState(todos.completedList);

  const handleSetList = (todoList: Task[]) => {
    setList(todoList);
  };

  React.useEffect(() => {
    getTodoList();
  }, []);

  React.useEffect(() => {
    setList(todos.completedList);
  }, [todos.completedList]);
  const { length } = todos.completedList;
  return (
    <Atoms.ThemedView className="flex-1">
      <Molecules.Welcome
        title="Tarefas a fazer"
        subtitle={`Você terminou ${length} tarefas`}
        emptySubtitle="Você ainda não terminou nenhuma tarefa"
        isEmpty={!length}
      />
      <Organism.DraggableList list={list} setList={handleSetList} />
    </Atoms.ThemedView>
  );
};

export default Completed;
