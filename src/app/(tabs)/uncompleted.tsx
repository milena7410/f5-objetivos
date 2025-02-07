import * as React from "react";

import * as Molecules from "~/components/molecules";
import * as Organism from "~/components/organism";
import * as Atoms from "~/components/atoms";
import { useTodos } from "~/store/reducers/todos/actions";
import { Task } from "~/core/domain/Task";
import { useDraggableList } from "~/hooks/useDraggableList";

const Uncompleted = () => {
  const { list, handleSetList, todos } = useDraggableList({
    listType: "uncompletedList",
  });
  const { length } = list;
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
