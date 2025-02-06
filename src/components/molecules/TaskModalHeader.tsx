import { Pressable } from "react-native";

import * as Atoms from "../atoms";

type TaskModalHeaderProps = { onPressEdit: VoidFunction };

const TaskModalHeader = ({ onPressEdit }: TaskModalHeaderProps) => (
  <Atoms.ThemedView className="flex-1">
    <Pressable className="self-end p-1" onPress={onPressEdit}>
      <Atoms.Icons
        className="size-8 text-primary-500"
        type="feather"
        name="edit"
      />
    </Pressable>
  </Atoms.ThemedView>
);

export { TaskModalHeader };
