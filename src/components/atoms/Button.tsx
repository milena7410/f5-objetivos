import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  textClassname?: string;
  buttonClassname?: string;
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
  buttonClassname = "",
  ...rest
}) => {
  const variantButtonStyle: Variant = {
    enabled: {
      primary: " bg-black dark:bg-white",
      secondary: "border border-black bg-white dark:bg-black dark:border-white",
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
      className={`${buttonClassname} rounded-full self-center h-14 w-40 "`}
      disabled={disabled}
      {...rest}
    >
      <View
        className={`${className}  ${variantButtonStyle[disabledProp][variant]} items-center justify-center rounded-full flex-1 self-stretch`}
      >
        <Text
          className={`${textClassname} text-sm font-bold ${textStyle[disabledProp][variant]}`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export { Button };
