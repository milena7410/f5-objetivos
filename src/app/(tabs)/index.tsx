import * as React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "~/components/atoms/ThemedText";
import { ThemedView } from "~/components/atoms/ThemedView";
import * as Atoms from "~/components/atoms";
import { useThemeContext } from "~/contexts/ThemeContext";
import { useTodos } from "~/store/reducers/todos/actions";

const App = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useThemeContext();
  const { todos, getTodoList } = useTodos();
  React.useEffect(() => {
    getTodoList();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ThemedView className="p-4 flex-1 align-center justify-between">
        <ThemedText>{colorScheme}</ThemedText>
        <Atoms.ThemedButton
          variant="primary"
          onPress={() => setColorScheme("light")}
          title="PRIMARY_LIGHT"
        />
        <Atoms.ThemedButton
          variant="primary"
          disabled
          onPress={() => setColorScheme("light")}
          title="PRIMARY_LIGHT_DISABLED"
        />
        <Atoms.ThemedButton
          variant="secondary"
          onPress={() => setColorScheme("dark")}
          title="SECONDARY_DARK"
        />
        <Atoms.ThemedButton
          disabled
          variant="secondary"
          onPress={() => setColorScheme("dark")}
          title="SECONDARY_DARK_DISABLED"
        />

        <Atoms.ThemedButton
          variant="danger"
          onPress={toggleColorScheme}
          title="DANGER_SWITCH"
        />
        <Atoms.ThemedButton
          disabled
          variant="danger"
          onPress={toggleColorScheme}
          title="DANGER_SWITCH_DISABLED"
        />
      </ThemedView>
      <ThemedView className="p-4 flex-row justify-evenly bg-white align-center">
        <Atoms.ThemedButton
          variant="primary"
          onPress={() => setColorScheme("light")}
          title="PRIMARY_LIGHT"
        />

        <Atoms.ThemedButton
          variant="secondary"
          onPress={() => setColorScheme("dark")}
          title="SECONDARY_DARK"
        />
      </ThemedView>
      <ScrollView>
        {todos.list
          .filter(
            ({ id }, index, arr) => arr.findIndex((t) => t.id === id) === index
          )
          .map(({ id, title, completed }) => (
            <ThemedView key={id}>
              <ThemedText className={completed ? "text-green-400" : ""}>
                {title} {completed}
              </ThemedText>
            </ThemedView>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
