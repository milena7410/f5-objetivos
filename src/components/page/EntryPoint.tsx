import * as React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { PortalHost } from "@gorhom/portal";

import { useThemeContext } from "~/contexts/ThemeContext";
import { useLoadFont } from "~/hooks/useLoadFont";
import { useSplashScreen } from "~/hooks/useSplashScreen";
import * as Organism from "~/components/organism";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const EntryPoint = () => {
  const { isLoaded, colorScheme } = useThemeContext();
  const { isLoaded: hasLoadedFont } = useLoadFont();
  if (!useSplashScreen(isLoaded && hasLoadedFont)) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: Organism.Header }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <PortalHost name="ThemedModal" />
    </ThemeProvider>
  );
};

export { EntryPoint };
