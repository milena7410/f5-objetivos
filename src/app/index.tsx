import { useEffect } from "react";
import { Button, ScrollView, View } from "react-native";
import { ThemedText } from "~/components/ThemedText";
import { ThemedView } from "~/components/ThemedView";
import { useTodos } from "~/store/reducers/todos/actions";
const App = () => {
  const { addTodo, todos, getTodoList } = useTodos();
  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <ThemedView>
      <View>
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
        <ScrollView>
          {todos.list.map((todo) => (
            <ThemedText key={todo.title}>{JSON.stringify(todo)}</ThemedText>
          ))}
        </ScrollView>
      </View>
    </ThemedView>
  );
};

export default App;
