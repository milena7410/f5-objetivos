import * as React from "react";

import * as Atoms from "~/components/atoms";
import * as Molecules from "~/components/molecules";
import * as Templates from "~/components/templates";
import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";

type CreateTaskModalProps = {
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
};
const CreateTaskModal = ({ isEditing, setIsEditing }: CreateTaskModalProps) => {
  const modalRef = React.useRef<Templates.BottomSheetMethods>(null);
  const { addTodo, todos } = useTodos();

  React.useEffect(() => {
    if (isEditing) {
      modalRef.current?.open();
    }
  }, [isEditing]);

  const handleCreateTask = (task: Partial<Task>) => {
    if (todos.selectedTask?.id) {
      handleClose();
      return;
    }
    addTodo({ title: task.title!, userId: 10 })
      .unwrap()
      .finally(() => {
        handleClose();
      });
  };
  const handleClose = () => {
    modalRef.current?.close();
    setIsEditing?.(false);
  };
  const onClose = React.useCallback(() => handleClose(), []);
  return (
    <Templates.ThemedModal onClose={onClose} ref={modalRef}>
      <Molecules.CreateTask
        task={todos.selectedTask}
        handleCancel={handleClose}
        handleTask={handleCreateTask}
      />
    </Templates.ThemedModal>
  );
};

export { CreateTaskModal };
