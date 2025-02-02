jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import "~/styles/global.css";

export const nativeWind = jest.mock("nativewind", () => {
  return {
    ...jest.requireActual("nativewind"),
    useColorScheme: jest.fn().mockReturnValue({
      colorScheme: "light",
      setColorScheme: jest.fn(),
      toggleColorScheme: jest.fn(),
    }),
  };
});
