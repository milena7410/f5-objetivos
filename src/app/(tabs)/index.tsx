import * as React from "react";
import { ActivityIndicatorBase, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import * as Atoms from "~/components/atoms";
import { useTodos } from "~/store/reducers/todos/actions";
const App = () => {
  const { addTodo, todos, getTodoList } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        {todos.state === "pending" ? (
          <ThemedText>...PENDING</ThemedText>
        ) : (
          <ThemedView>
            {todos.list.map((todo) => (
              <ThemedText
                key={todo.title}
                className={`${
                  todo.completed
                    ? "text-green-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {todo.title}
              </ThemedText>
            ))}
          </ThemedView>
        )}
      </ScrollView>
      <Atoms.Button />
    </SafeAreaView>
  );
};

export default App;
