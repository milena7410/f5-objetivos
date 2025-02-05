import * as React from "react";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { cssInterop } from "nativewind";

const IconTypes = {
  materialIcons: MaterialIcons,
  feather: Feather,
  octicons: Octicons,
};

type CheckListIconProps = {
  type: keyof typeof IconTypes;
  name:
    | "check-box"
    | "check-square"
    | "checklist"
    | "edit"
    | "home"
    | "square"
    | "trash-2";
  size?: number;
  className?: string;
  style?: {};
  color?: string;
};

function extractCss(component: React.FC<CheckListIconProps>) {
  return cssInterop(component, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        height: "size",
        width: "size",
      },
    },
  });
}

export const Icons = extractCss(
  ({ name, type, className, ...rest }: CheckListIconProps) => {
    const IconLib = IconTypes[type];
    return <IconLib name={name as any} {...rest} />;
  }
);
