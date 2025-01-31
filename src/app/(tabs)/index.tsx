import * as React from "react";
import { ActivityIndicatorBase, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { useTodos } from "~/store/reducers/todos/actions";
const App = () => {
  const { addTodo, todos, getTodoList } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", gap: 8, margin: 20 }}>
      <ScrollView>
        {todos.state === "pending" ? (
          <ActivityIndicatorBase></ActivityIndicatorBase>
        ) : (
          todos.list.map((todo) => (
            <ThemedText
              key={todo.title}
              style={{ color: todo.completed ? "green" : "yellow" }}
            >
              {todo.title}
            </ThemedText>
          ))
        )}
      </ScrollView>
      <Button
        title="CREATE"
        onPress={() =>
          addTodo({
            userId: 1,
            title: "NOVA TAREFA",
            completed: false,
          })
        }
      />
    </SafeAreaView>
  );
};

export default App;
