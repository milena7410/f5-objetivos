import { View, type ViewProps } from "react-native";

export type ThemedViewProps = {} & ViewProps;

const ThemedView = ({ className = "", ...rest }: ThemedViewProps) => {
  return <View className={className + "bg-white dark:bg-black "} {...rest} />;
};

export { ThemedView };
