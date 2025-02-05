import * as React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";
import { TodoListItemContent } from "./TodoListItemContent";
import * as Molecules from "../molecules";

type TodoListItemProps = {
  onLongPress?: (event: GestureResponderEvent) => void;
  task: Task;
  isActive?: boolean;
  index?: number;
};

const TodoListItem = ({
  isActive,
  onLongPress,
  task,
  index,
}: TodoListItemProps) => {
  const { selectTask } = useTodos();

  return (
    <Molecules.SwippleCard
      item={task}
      startOpened={index === 0}
      className="flex-1 shrink-0"
    >
      <TouchableOpacity
        onPress={() => selectTask(task.id)}
        className="flex-1 self-stretch"
        onLongPress={onLongPress}
        disabled={isActive}
      >
        <TodoListItemContent
          task={task}
          isActive={isActive}
          numberOfLines={2}
        />
      </TouchableOpacity>
    </Molecules.SwippleCard>
  );
};

export { TodoListItem };
