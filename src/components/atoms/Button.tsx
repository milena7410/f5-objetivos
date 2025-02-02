import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  textClassname?: string;
} & PressableProps;

type Variant = {
  disabled: { primary: string; secondary: string; danger: string };
  enabled: { primary: string; secondary: string; danger: string };
};
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  title,
  disabled,
  className = "",
  textClassname = "",
  ...rest
}) => {
  const variantButtonStyle: Variant = {
    enabled: {
      primary: "bg-black dark:bg-white",
      secondary: "bg-white dark:bg-black",
      danger: "bg-danger",
    },
    disabled: {
      primary: "bg-gray-500",
      secondary: "bg-gray-300",
      danger: "bg-red-300",
    },
  };

  const textStyle: Variant = {
    enabled: {
      primary: "text-white dark:text-black",
      secondary: "text-black dark:text-white",
      danger: "text-txt-danger",
    },
    disabled: {
      primary: "text-white",
      secondary: "text-black ",
      danger: "text-txt-danger",
    },
  };

  const disabledProp = disabled ? "disabled" : "enabled";
  return (
    <Pressable
      disabled={disabled}
      className={`round-lg ${variantButtonStyle[disabledProp][variant]} ${className}`}
      {...rest}
    >
      <Text
        className={`font-bold ${textStyle[disabledProp][variant]} ${textClassname}`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export { Button };
