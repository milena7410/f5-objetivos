import * as React from "react";
import { Pressable } from "react-native";
import { Toast } from "toastify-react-native";

import { Task } from "~/core/domain/Task";
import { useTodos } from "~/store/reducers/todos/actions";
import * as Atoms from "~/components/atoms";
import { useOptimist } from "~/hooks/useOptimist";

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
  const { completeTask, undoCompletedTask, todos } = useTodos();

  async function ToggleTask(newCompleted: boolean) {
    if (newCompleted) {
      return completeTask(task.id).unwrap();
    }
    return undoCompletedTask(task.id).unwrap();
  }
  const [isCompleted, setOptimist] = useOptimist(task.completed, ToggleTask);

  React.useEffect(() => {
    if (todos.error) Toast.error(todos.error, "top");
  }, [todos.error]);

  return (
    <Atoms.ThemedView
      className={`min-h-20 pr-4 shrink-0 flex-row items-center  ${
        isActive ? "bg-primary/60 dark:bg-primary/30" : ""
      }`}
    >
      <Pressable className=" p-4" onPress={() => setOptimist(!task.completed)}>
        <Atoms.Icons
          className="size-8 text-primary-500"
          type="feather"
          name={isCompleted ? "check-square" : "square"}
        />
      </Pressable>
      <Atoms.ThemedText
        numberOfLines={numberOfLines}
        lineBreakMode="tail"
        lineBreakStrategyIOS="hangul-word"
        className={`${isCompleted ? "line-through" : ""} flex-1  text-xl`}
      >
        {task.title}
      </Atoms.ThemedText>
      {isActive !== undefined && (
        <Atoms.Icons
          name="drag-handle"
          type="materialIcons"
          className="size-8 pl-4 text-primary/20"
        />
      )}
    </Atoms.ThemedView>
  );
};

export { TodoListItemContent };
