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
  const { length } = todos.uncompletedList;
  return (
    <>
      <Atoms.ThemedView className="flex-1">
        <Molecules.Welcome
          title="Bem-vindo!"
          subtitle={`Você tem ${length} tarefas a fazer`}
          emptySubtitle={
            todos.list.length
              ? `Parabéns 🥳 você terminou todas as ${todos.list.length} tarefas`
              : "Você não tem tarefas em aberto"
          }
          isEmpty={!length}
        />
        <Organism.DraggableList
          showDeleteAll
          list={list}
          setList={handleSetList}
        />
      </Atoms.ThemedView>
      <Organism.TaskModal />
      <Organism.ChangeThemePicker />
    </>
  );
};

export default App;
