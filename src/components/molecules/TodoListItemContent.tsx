import { Pressable } from "react-native";

import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";
import * as Atoms from "~/components/atoms";

type TaskContentProps = {
  task: Task;
  isActive?: boolean;
  numberOfLines?: number;
};

const TodoListItemContent = ({
  task,
  isActive,
  numberOfLines,
}: TaskContentProps) => {
  const { completeTask, undoCompletedTask } = useTodos();
  function ToggleTask() {
    if (task.completed) {
      undoCompletedTask(task.id);
      return;
    }
    completeTask(task.id);
  }
  return (
    <Atoms.ThemedView
      className={`min-h-20 px-4 shrink-0 flex-row gap-4 items-center  ${
        isActive ? "bg-primary/60 dark:bg-primary/30" : ""
      }`}
    >
      <Pressable onPress={ToggleTask}>
        <Atoms.Icons
          className="size-8 text-primary-500"
          type="feather"
          name={task.completed ? "check-square" : "square"}
        />
      </Pressable>
      <Atoms.ThemedText
        numberOfLines={numberOfLines}
        lineBreakMode="tail"
        lineBreakStrategyIOS="hangul-word"
        className={`${task.completed ? "line-through" : ""} flex-1  text-xl`}
      >
        {task.title}
      </Atoms.ThemedText>
    </Atoms.ThemedView>
  );
};

export { TodoListItemContent };
