import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const ThemedText = ({
  type = "default",
  className = "",
  ...rest
}: ThemedTextProps) => {
  return (
    <Text
      className={`${className} text-txt-primary dark:text-txt-dark`}
      {...rest}
    />
  );
};

export { ThemedText };
