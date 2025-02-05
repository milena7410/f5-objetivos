import * as React from "react";
import { useColorScheme, cssInterop } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "~/styles/global.css";

export type Mode = "light" | "dark" | "system";

const ThemeContext = React.createContext<{
  isLoaded: boolean;
  colorScheme: "light" | "dark";
  openPicker: boolean;
  setOpenPicker(value: boolean): void;
  toggleColorScheme: VoidFunction;
  setColorScheme(newColor: Mode): void;
  cssInterop: typeof cssInterop;
}>({
  isLoaded: false,
  openPicker: false,
  colorScheme: "light",
  toggleColorScheme: () => {},
  setOpenPicker: () => {},
  setColorScheme: () => {},
  cssInterop: cssInterop,
});

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const [colorMode, setColorMode] = React.useState<Mode>("system");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [openPicker, setOpenPicker] = React.useState(false);
  const {
    colorScheme = "light",
    setColorScheme: setNativeColorSchema,
    toggleColorScheme: switchColorScheme,
  } = useColorScheme();

  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((theme) => {
      setIsLoaded(true);
      if (theme) {
        const currentTheme = theme as typeof colorScheme;
        setColorScheme(currentTheme);
        setColorMode(currentTheme);
        return;
      }
      setColorScheme("system");
    });
  }, []);

  React.useEffect(() => {
    AsyncStorage.setItem("theme", colorMode);
  }, [colorMode]);

  const setColorScheme = React.useCallback((mode: Mode) => {
    if (mode === "system" && window?.matchMedia) {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    setColorMode(mode);
    setNativeColorSchema(mode);
  }, []);

  const toggleColorScheme = React.useCallback(() => {
    switchColorScheme();
    const newColor = colorScheme === "light" ? "dark" : "light";
    setColorMode(newColor);
    AsyncStorage.setItem("theme", newColor);
  }, [colorScheme]);

  const value = React.useMemo(
    () => ({
      colorScheme,
      toggleColorScheme,
      setColorScheme,
      cssInterop,
      setOpenPicker,
      isLoaded,
      openPicker,
    }),
    [colorScheme, toggleColorScheme, openPicker, setColorScheme, isLoaded]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  return React.useContext(ThemeContext);
};
