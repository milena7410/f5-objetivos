import { ThemedText, ThemedView } from "../atoms";

const EmptyList = () => (
  <ThemedView className="items-center flex-1 h-40 justify-center">
    <ThemedText className="text-xl font-space-mono">Lista vazia</ThemedText>
  </ThemedView>
);

export { EmptyList };
