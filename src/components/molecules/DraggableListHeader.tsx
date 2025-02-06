import * as React from "react";
import * as Atoms from "../atoms";
import * as Molecules from "../molecules";
import * as Templates from "../templates";
import { Toast } from "toastify-react-native";
import { useTodos } from "~/store/reducers/todos/actions";

type DraggableListHeaderProps = {
  showDeleteAll?: boolean;
};
const DraggableListHeader = ({ showDeleteAll }: DraggableListHeaderProps) => {
  const modalRef = React.useRef<Templates.BottomSheetMethods>(null);

  const { todos, deleteAllTasks } = useTodos();

  const handleClose = React.useCallback(() => {
    modalRef.current?.close();
  }, []);

  const handleDeleteAll = React.useCallback(() => {
    handleClose();
    deleteAllTasks();
    Toast.info("Lista limpa");
  }, []);

  return (
    <>
      <Atoms.ThemedView className="p-4 flex-row justify-between item-center">
        <Atoms.ThemedText fontStyle="bold" className="text-xl self-center">
          Tarefas
        </Atoms.ThemedText>
        {!!todos.list.length && showDeleteAll && (
          <Atoms.ThemedButton
            onPress={() => {
              modalRef.current?.open();
            }}
            variant="linkDanger"
            title="Excluir todas"
          />
        )}
      </Atoms.ThemedView>
      <Molecules.ConfirmModal
        confirmButtonVariant="danger"
        cancelButtonTitle="Cancelar"
        confirmButtonTitle="Apagar todas"
        modalTitle="Você tem certeza que quer apagar tudo?"
        onCancel={handleClose}
        onConfirm={handleDeleteAll}
        ref={modalRef}
      />
    </>
  );
};

export { DraggableListHeader };
