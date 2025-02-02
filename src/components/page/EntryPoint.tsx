import * as React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useThemeContext } from "~/contexts/ThemeContext";

const EntryPoint = () => {
  const { isLoaded } = useThemeContext();
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export { EntryPoint };
