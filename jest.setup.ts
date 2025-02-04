import { useState } from "react";
import "~/styles/global.css";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-font", () => {
  const module: typeof import("expo-font") = {
    ...jest.requireActual("expo-font"),
    isLoaded: jest.fn(() => true),
  };

  return module;
});

jest.mock("nativewind", () => {
  return {
    ...jest.requireActual("nativewind"),
    useColorScheme: jest.fn().mockReturnValue({
      colorScheme: "light",
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    }),
  };
});
