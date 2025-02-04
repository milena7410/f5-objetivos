import { Icons, ThemedText, ThemedView } from "../atoms";

const Header = () => {
  return (
    <ThemedView className="pt-safe p-4 flex-row items-center gap-4">
      <Icons
        className="size-10 text-primary"
        type="materialIcons"
        name="check-box"
      />
      <ThemedText className="text-4xl font-bold">ToDo List SHX</ThemedText>
    </ThemedView>
  );
};

export { Header };
