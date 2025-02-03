import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "~/components/atoms/ThemedText";
import { ThemedView } from "~/components/atoms/ThemedView";
import { IconSymbol } from "~/components/ui/IconSymbol";
import { useThemeColors } from "~/hooks/useThemeColor";

export function Collapsible({
  children,
  title,
}: React.PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const colors = useThemeColors();

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={colors.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
