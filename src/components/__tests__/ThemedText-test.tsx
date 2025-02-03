import * as React from "react";
import { render } from "@testing-library/react-native";
import { ThemedText } from "../atoms/ThemedText";

it(`renders correctly`, () => {
  const tree = render(<ThemedText>Snapshot test!</ThemedText>).toJSON();
  expect(tree).toMatchSnapshot();
});
