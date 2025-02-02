import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

import { useThemeContext } from "~/contexts/ThemeContext";
import { ThemedText } from "../ThemedText";

export const Button = () => {
  const { toggleColorScheme, setColorScheme } = useThemeContext();

  return (
    <View className="bg-white gap-4 dark:bg-gray-800 rounded-lg px-6 py-8">
      <Text className="text-red-500">
        Open up App.js to start working on your app!
      </Text>
      <Pressable
        onPress={toggleColorScheme}
        className="align-center justify-center bg-blue-700 dark:bg-black border-white dark:border-black rounded-md"
      >
        <ThemedText className="self-center text-white">SWITCH</ThemedText>
      </Pressable>
      <Pressable
        onPress={() => setColorScheme("system")}
        className="align-center justify-center bg-black rounded-md"
      >
        <ThemedText className="self-center text-white">SYSTEM</ThemedText>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};
