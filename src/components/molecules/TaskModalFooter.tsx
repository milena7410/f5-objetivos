import * as Atoms from "~/components/atoms";
import { Task } from "~/core/domain/Task";

type TaskModalFooterProps = {
  onDelete: (id: number) => void;
  onCancel: VoidFunction;
  task: Task;
};

const TaskModalFooter = ({
  onCancel,
  onDelete,
  task,
}: TaskModalFooterProps) => (
  <Atoms.ThemedView className="gap-4 ">
    <Atoms.ThemedView className="flex-row gap-4 justify-center">
      <Atoms.ThemedButton
        variant="danger"
        onPress={() => {
          onDelete(task.id);
        }}
        title="Remover"
      />
      <Atoms.ThemedButton
        variant="secondary"
        onPress={onCancel}
        title="Cancelar"
      />
    </Atoms.ThemedView>
  </Atoms.ThemedView>
);

export { TaskModalFooter };
