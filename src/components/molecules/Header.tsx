import * as Atoms from "../atoms";

const Header = () => {
  return (
    <Atoms.ThemedView className="pt-safe p-4 flex-row items-center gap-4">
      <Atoms.Icons
        className="size-10 text-primary"
        type="materialIcons"
        name="check-box"
      />
      <Atoms.ThemedText fontStyle="bold" className="text-4xl font-bold">
        ToDo List SHX
      </Atoms.ThemedText>
    </Atoms.ThemedView>
  );
};

export { Header };
