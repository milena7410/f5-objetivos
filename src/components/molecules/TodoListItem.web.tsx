import * as React from "react";
import { GestureResponderEvent } from "react-native";

import { Task } from "~/core/domain/Task";
import * as Atoms from "../atoms";

type TodoListItemProps = {
  onLongPress: (event: GestureResponderEvent) => void;
  isActive: boolean;
  task: Task;
  index?: number;
};

const TodoListItem = ({ isActive, task }: TodoListItemProps) => (
  <Atoms.ThemedView
    className={`h-20 shrink-0 items-center justify-center ${
      isActive ? "bg-primary/60 dark:bg-primary/30" : ""
    }`}
  >
    <Atoms.ThemedText className="text-center text-xl">
      {task.title}
    </Atoms.ThemedText>
  </Atoms.ThemedView>
);

export { TodoListItem };
