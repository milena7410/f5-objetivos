import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import { useColorScheme } from "nativewind";

import { ThemeProvider } from "~/contexts/ThemeContext";
import { Button } from "../Button";
import "~/styles/global.css";

describe("Button Component", () => {
  const spyToggleColorScheme = jest.spyOn(
    useColorScheme(),
    "toggleColorScheme"
  );
  const spySetColorScheme = jest.spyOn(useColorScheme(), "setColorScheme");
  it("should render default button", async () => {
    render(
      <ThemeProvider>
        <Button />
      </ThemeProvider>
    );

    await waitFor(() => {
      const switchButton = screen.getByText("SWITCH");
      expect(spyToggleColorScheme).toHaveBeenCalledTimes(0);
      fireEvent.press(switchButton);
      expect(spyToggleColorScheme).toHaveBeenCalledTimes(1);

      const switchSystem = screen.getByText("SYSTEM");
      expect(spySetColorScheme).toHaveBeenCalledTimes(0);
      fireEvent.press(switchSystem);
      expect(spySetColorScheme).toHaveBeenCalledTimes(1);
      expect(screen.getByText("SWITCH")).toBeTruthy();
    });
  });
});
