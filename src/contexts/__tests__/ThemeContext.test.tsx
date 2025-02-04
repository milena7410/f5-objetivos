import * as React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import nativewind from "nativewind";

import { ThemedButton, ThemedText } from "~/components/atoms";
import { ThemeProvider, useThemeContext } from "../ThemeContext";

const useNativewindMock = () => {
  const [colorScheme, setColorScheme] = React.useState<
    "light" | "dark" | undefined
  >("light");
  const SYSTEM_PREFERENCE = "dark";

  const handleColorsSchema = (newColor: "light" | "dark" | "system") => {
    if (newColor === "system") {
      setColorScheme(SYSTEM_PREFERENCE);
      return;
    }
    setColorScheme(newColor);
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return { colorScheme, setColorScheme: handleColorsSchema, toggleColorScheme };
};

const ThemeComponent = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useThemeContext();
  return (
    <>
      <ThemedButton onPress={() => setColorScheme("light")} title="LIGHT" />
      <ThemedButton onPress={() => setColorScheme("dark")} title="DARK" />
      <ThemedButton onPress={() => setColorScheme("system")} title="SYSTEM" />
      <ThemedButton onPress={toggleColorScheme} title="TOGGLE" />
      <ThemedText>{colorScheme}</ThemedText>
    </>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    jest
      .spyOn(nativewind, "useColorScheme")
      .mockImplementation(useNativewindMock);
  });
  it("should colorScheme to light when press setColorScheme('light')", async () => {
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    await waitFor(() => {
      const toLight = screen.getByText("LIGHT");
      fireEvent(toLight, "press");
    });
    screen.getByText("light");
  });

  it("should colorScheme to dark when press setColorScheme('dark')", async () => {
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    await waitFor(() => {
      const toDark = screen.getByText("DARK");
      fireEvent(toDark, "press");
    });
    screen.getByText("dark");
  });

  it("should colorScheme to system when press setColorScheme('system')", async () => {
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    await waitFor(() => {
      const toSystem = screen.getByText("SYSTEM");
      fireEvent(toSystem, "press");
    });
    screen.getByText("dark");
  });

  it("should switch colorSchema when press toggleColorScheme()", async () => {
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    await waitFor(() => {
      const toggle = screen.getByText("TOGGLE");
      screen.getByText("light");
      fireEvent(toggle, "press");
    });
    screen.getByText("dark");
  });

  it("should switch colorSchema when web()", async () => {
    const IS_DEFAULT_DARK = true;
    Object.defineProperty(window, "matchMedia", {
      writable: IS_DEFAULT_DARK,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    await waitFor(() => {
      const toSystemWeb = screen.getByText("SYSTEM");
      screen.getByText("light");
      fireEvent(toSystemWeb, "press");
      screen.getByText("dark");
    });
  });

  it("should set colorSchema light when web default is light", async () => {
    const IS_DEFAULT_DARK = false;
    Object.defineProperty(window, "matchMedia", {
      writable: IS_DEFAULT_DARK,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    render(
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    );
    const changeDefaultColorSchemaToDark = () => {
      screen.getByText("light");
      const toDark = screen.getByText("DARK");
      fireEvent(toDark, "press");
      screen.getByText("dark");
    };
    await waitFor(() => {
      changeDefaultColorSchemaToDark();
      const toSystemWeb = screen.getByText("SYSTEM");
      fireEvent(toSystemWeb, "press");
      screen.getByText("light");
    });
  });
});
