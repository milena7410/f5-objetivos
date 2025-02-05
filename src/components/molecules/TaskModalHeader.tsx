import { Pressable } from "react-native";

import * as Atoms from "../atoms";

type TaskModalHeaderProps = { onPressEdit: VoidFunction };

const TaskModalHeader = ({ onPressEdit }: TaskModalHeaderProps) => (
  <Pressable onPress={onPressEdit}>
    <Atoms.Icons
      className="self-end size-8 text-primary-500 m-4 mb-0"
      type="feather"
      name="edit"
    />
  </Pressable>
);

export { TaskModalHeader };
