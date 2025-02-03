import Feather from "@expo/vector-icons/Feather";
import { cssInterop } from "nativewind";

type CheckListIconProps = {
  size?: number;
  className?: string;
  style?: {};
  color?: string;
};

export const CheckListIcon = cssInterop(
  ({ ...rest }: CheckListIconProps) => {
    console.log(rest);
    return <Feather name="check-square" {...rest} />;
  },
  {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        height: "size",
        width: "size",
      },
    },
  }
);
