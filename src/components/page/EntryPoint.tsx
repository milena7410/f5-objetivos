import * as React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useThemeContext } from "~/contexts/ThemeContext";
import { useLoadFont } from "~/hooks/useLoadFont";
import { useSplashScreen } from "~/hooks/useSplashScreen";
import * as Molecules from "../molecules";

const EntryPoint = () => {
  const { isLoaded, colorScheme } = useThemeContext();
  const { isLoaded: hasLoadedFont } = useLoadFont();
  useSplashScreen(isLoaded && hasLoadedFont);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: Molecules.Header }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
    </>
  );
};

export { EntryPoint };
