import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

type Variant = {
  primary: string;
  secondary: string;
  danger: string;
  linkDanger: string;
};

type Variants = {
  disabled: Variant;
  enabled: Variant;
};

type ThemedButtonProps = {
  title: string;
  variant?: keyof Variant;
  disabled?: boolean;
  textClassname?: string;
  buttonClassname?: string;
} & PressableProps;

const ThemedButton = ({
  variant = "primary",
  title,
  disabled,
  className = "",
  textClassname = "",
  buttonClassname = "",
  ...rest
}: ThemedButtonProps) => {
  const variantButtonStyle: Variants = {
    enabled: {
      primary: " bg-black dark:bg-white",
      secondary:
        "border border-primary-500 bg-white dark:bg-black dark:border-white",
      danger: "bg-danger",
      linkDanger: "",
    },
    disabled: {
      primary: "bg-gray-500",
      secondary: "bg-gray-300",
      danger: "bg-red-300",
      linkDanger: "",
    },
  };

  const textStyle: Variants = {
    enabled: {
      primary: "text-white dark:text-black",
      secondary: "text-black dark:text-white",
      danger: "text-txt-danger",
      linkDanger: "text-danger",
    },
    disabled: {
      primary: "text-white",
      secondary: "text-black ",
      danger: "text-txt-danger",
      linkDanger: "text-danger",
    },
  };

  const disabledProp = disabled ? "disabled" : "enabled";
  return (
    <Pressable
      className={`${buttonClassname} self-center h-14 w-40 "`}
      disabled={disabled}
      {...rest}
    >
      <View
        className={`${className}  ${variantButtonStyle[disabledProp][variant]} items-center justify-center rounded-full flex-1 self-stretch`}
      >
        <Text
          className={`${textClassname} w-full text-center font-urbanist-bold ${textStyle[disabledProp][variant]}`}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export { ThemedButton, Variant };
