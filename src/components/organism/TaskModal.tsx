import * as React from "react";
import { View } from "react-native";

import * as Templates from "~/components/templates";
import * as Molecules from "~/components/molecules";
import { useTodos } from "~/store/reducers/todos/actions";

const TaskModal = () => {
  const modalRef = React.useRef<Templates.BottomSheetMethods>(null);
  const { todos, deleteTask, unSelectTask } = useTodos();

  React.useEffect(() => {
    if (todos.selectedTask) {
      modalRef.current?.open();
      return;
    }
    modalRef.current?.close();
  }, [todos.selectedTask]);
  const handleEdit = React.useCallback(() => {
    unSelectTask();
  }, []);
  return (
    <Templates.ThemeModal onClose={unSelectTask} ref={modalRef}>
      <View className="min-h-72 justify-between">
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
      </View>
    </Templates.ThemeModal>
  );
};

export { TaskModal };
