import * as React from "react";
import * as Atoms from "../atoms";
import * as Molecules from "../molecules";
import * as Templates from "../templates";
import { Toast } from "toastify-react-native";
import { useTodos } from "~/store/reducers/todos/actions";
const DraggableListHeader = () => {
  const modalRef = React.useRef<Templates.BottomSheetMethods>(null);
  const { todos } = useTodos();
  const handleDeleteAll = () => {
    console.log("APAGAR TODOS");
    modalRef.current?.close();
    Toast.success(`Feito`);
  };
  return (
    <Atoms.ThemedView className="p-4 flex-row justify-between item-center">
      <Atoms.ThemedText fontStyle="bold" className="text-xl self-center">
        Tarefas
      </Atoms.ThemedText>
      {todos.list.length && (
        <Atoms.ThemedButton
          onPress={() => {
            modalRef.current?.open();
          }}
          variant="linkDanger"
          title="Excluir todas"
        />
      )}
      <Molecules.ConfirmModal
        confirmButtonVariant="danger"
        cancelButtonTitle="Cancelar"
        confirmButtonTitle="Apagar todas"
        modalTitle="Você tem certeza que quer apagar tudo?"
        onCancel={() => modalRef.current?.close()}
        onConfirm={handleDeleteAll}
        ref={modalRef}
      />
    </Atoms.ThemedView>
  );
};

export { DraggableListHeader };
