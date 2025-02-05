import { Pressable } from "react-native";

import * as Atoms from "../atoms";
import { useThemeContext } from "~/contexts/ThemeContext";

const Header = () => {
  const { setOpenPicker, openPicker } = useThemeContext();
  return (
    <Atoms.ThemedView className="pt-safe-offset-4 p-4 flex-row items-center justify-between">
      <Atoms.ThemedView className="flex-row items-center gap-4">
        <Atoms.Icons
          className="size-10  text-primary"
          type="materialIcons"
          name="check-box"
        />
        <Atoms.ThemedText fontStyle="bold" className="text-4xl font-bold">
          ToDo List SHX
        </Atoms.ThemedText>
      </Atoms.ThemedView>
      <Pressable onPress={() => setOpenPicker(!openPicker)}>
        <Atoms.ThemedView className="rounded-lg">
          <Atoms.Icons
            className="size-10  text-primary"
            type="materialCommunityIcons"
            name="theme-light-dark"
          />
        </Atoms.ThemedView>
      </Pressable>
    </Atoms.ThemedView>
  );
};

export { Header };
