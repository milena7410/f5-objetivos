import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react-native";

import { useColorScheme } from "nativewind";

import { ThemeProvider } from "~/contexts/ThemeContext";
import { Button } from "../ThemedButton";
import "~/styles/global.css";

describe("Button Component", () => {
  const spyToggleColorScheme = jest.spyOn(
    useColorScheme(),
    "toggleColorScheme"
  );
  const spySetColorScheme = jest.spyOn(useColorScheme(), "setColorScheme");
  it("should render button and pressable", async () => {
    const callMock = jest.fn();

    render(
      <ThemeProvider>
        <Button onPress={callMock} title="PRIMARY" />
        <Button onPress={callMock} title="SECONDARY" />
        <Button onPress={callMock} title="DANGER" />
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
      expect(screen.toJSON()).toMatchSnapshot();
    });
    expect(callMock).toHaveBeenCalledTimes(3);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should button not be pressable when it is disabled", async () => {
    const callMock = jest.fn();

    render(
      <ThemeProvider>
        <Button disabled onPress={callMock} title="PRIMARY" />
        <Button disabled onPress={callMock} title="SECONDARY" />
        <Button disabled onPress={callMock} title="DANGER" />
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
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
