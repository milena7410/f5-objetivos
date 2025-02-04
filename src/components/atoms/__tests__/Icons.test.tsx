import React from "react";
import { render } from "@testing-library/react-native";

import { Icons } from "../Icons";

describe("Icons Component", () => {
  it("should render Icon when Feather", async () => {
    const { toJSON } = render(
      <Icons
        className="text-primary size-5"
        type="feather"
        name="check-square"
      />
    );
    expect(toJSON).toMatchSnapshot();
  });

  it("should render Icon when Octicons", async () => {
    const { toJSON } = render(
      <Icons className="text-primary size-5" type="octicons" name="home" />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
