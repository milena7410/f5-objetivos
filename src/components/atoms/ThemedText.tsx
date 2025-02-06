import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  fontStyle?: "normal" | "italic" | "semibold" | "bold";
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const fontStyles = {
  normal: "font-urbanist",
  italic: "font-urbanist-italic",
  semibold: "font-urbanist-semibold",
  bold: "font-urbanist-bold",
};

const ThemedText = ({
  type = "default",
  className = "",
  fontStyle = "normal",
  ...rest
}: ThemedTextProps) => {
  return (
    <Text
      className={`${className} ${fontStyles[fontStyle]}  text-txt-primary dark:text-txt-dark`}
      {...rest}
    />
  );
};

export { ThemedText };
