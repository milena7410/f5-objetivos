import * as Atoms from "../atoms";

const DraggableListHeader = () => (
  <Atoms.ThemedView className="p-4 ">
    <Atoms.ThemedText fontStyle="bold" className="text-xl font-bold">
      Tarefas
    </Atoms.ThemedText>
  </Atoms.ThemedView>
);

export { DraggableListHeader };
