import * as Atoms from "../atoms";

const DraggableListHeader = () => (
  <Atoms.ThemedView className="p-4 flex-row justify-between item-center">
    <Atoms.ThemedText
      fontStyle="bold"
      className="text-xl self-center font-bold"
    >
      Tarefas
    </Atoms.ThemedText>
  </Atoms.ThemedView>
);

export { DraggableListHeader };
