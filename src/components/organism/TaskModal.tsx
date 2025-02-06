import * as React from "react";

import * as Atoms from "~/components/atoms";
import * as Templates from "~/components/templates";
import * as Molecules from "~/components/molecules";
import { useTodos } from "~/store/reducers/todos/actions";
import { CreateTaskModal } from "./CreateTaskModal";

const TaskModal = () => {
  const modalRef = React.useRef<Templates.BottomSheetMethods>(null);
  const { todos, deleteTask, unSelectTask } = useTodos();
  const [openEditModal, setOpenEditModal] = React.useState(false);
  React.useEffect(() => {
    if (todos.selectedTask?.id) {
      modalRef.current?.open();
      return;
    }
    modalRef.current?.close();
  }, [todos.selectedTask?.id]);

  const handleEdit = React.useCallback(() => {
    setOpenEditModal(true);
    modalRef.current?.close();
  }, []);

  const editFinished = () => {
    setOpenEditModal(false);
    modalRef.current?.open();
  };

  const onClose = React.useCallback(
    () => !openEditModal && unSelectTask(),
    [openEditModal]
  );
  return (
    <>
      <Templates.ThemedModal onClose={onClose} ref={modalRef}>
        <Atoms.ThemedView className="min-h-72 justify-between">
          {todos.selectedTask && (
            <>
              <Molecules.TaskModalHeader onPressEdit={handleEdit} />
              <Molecules.TodoListItemContent task={todos.selectedTask} />
              <Molecules.TaskModalFooter
                onDelete={(id) => {
                  deleteTask(id);
                }}
                onCancel={() => unSelectTask()}
                task={todos.selectedTask}
              />
            </>
          )}
        </Atoms.ThemedView>
      </Templates.ThemedModal>

      <CreateTaskModal setIsEditing={editFinished} isEditing={openEditModal} />
    </>
  );
};

export { TaskModal };
