import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as React from "react";
import { TextInput } from "react-native";

import * as Atoms from "~/components/atoms";
import * as Molecules from "~/components/molecules";
import { Task } from "~/core/domain/Task";

type CreateTaskProps = {
  handleTask: (task: Partial<Task>) => void;
  handleCancel: VoidFunction;
  task?: Task;
};
const CreateTask = ({ task, handleTask, handleCancel }: CreateTaskProps) => {
  const [taskTitle, setTaskTitle] = React.useState(task?.title || "");
  const title = task?.id ? "Editar" : "Criar";
  const send = () => handleTask({ ...task, title: taskTitle });

  return (
    <Atoms.ThemedView className=" gap-10 p-4 justify-between">
      <Atoms.ThemedText>Task</Atoms.ThemedText>
      <BottomSheetTextInput
        className="border border-primary-500 bg-blue-50 font-urbanist text text-xl rounded-lg p-4"
        placeholderClassName="font-urbanist"
        editable
        placeholder="Escreva sua tarefa"
        value={taskTitle}
        onChangeText={setTaskTitle}
        onPointerEnter={send}
        enterKeyHint="enter"
        returnKeyType="done"
        returnKeyLabel={title}
        onSubmitEditing={send}
      />
      <Atoms.ThemedView className="flex-row gap-4 justify-center">
        <Atoms.ThemedButton onPress={send} title={title} />
        <Atoms.ThemedButton
          variant="secondary"
          onPress={handleCancel}
          title="Cancelar"
        />
      </Atoms.ThemedView>
    </Atoms.ThemedView>
  );
};

export { CreateTask };
