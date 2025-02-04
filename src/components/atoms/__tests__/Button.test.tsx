import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react-native";

import { useColorScheme } from "nativewind";

import "~/styles/global.css";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { ThemedButton } from "../ThemedButton";

describe("Button Component", () => {
  const spyToggleColorScheme = jest.spyOn(
    useColorScheme(),
    "toggleColorScheme"
  );

  it("should render button and pressable", async () => {
    const callMock = jest.fn();

    render(
      <ThemeProvider>
        <ThemedButton onPress={callMock} title="PRIMARY" />
        <ThemedButton onPress={callMock} title="SECONDARY" />
        <ThemedButton onPress={callMock} title="DANGER" />
      </ThemeProvider>
    );
    await waitFor(() => {
      const primary = screen.getByText("PRIMARY");
      const secondary = screen.getByText("SECONDARY");
      const danger = screen.getByText("DANGER");

      expect(callMock).toHaveBeenCalledTimes(0);

      fireEvent(primary, "press");
      fireEvent(secondary, "press");
      fireEvent(danger, "press");
    });
    expect(callMock).toHaveBeenCalledTimes(3);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should button not be pressable when it is disabled", async () => {
    const callMock = jest.fn();

    render(
      <ThemeProvider>
        <ThemedButton disabled onPress={callMock} title="PRIMARY" />
        <ThemedButton disabled onPress={callMock} title="SECONDARY" />
        <ThemedButton disabled onPress={callMock} title="DANGER" />
      </ThemeProvider>
    );
    await waitFor(() => {
      const primary = screen.getByText("PRIMARY");
      const secondary = screen.getByText("SECONDARY");
      const danger = screen.getByText("DANGER");

      expect(callMock).not.toHaveBeenCalled();

      fireEvent(primary, "press");
      fireEvent(secondary, "press");
      fireEvent(danger, "press");
      expect(screen.toJSON()).toMatchSnapshot();
    });
    expect(callMock).not.toHaveBeenCalled();
  });
});
