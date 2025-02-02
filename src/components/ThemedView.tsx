import { View, type ViewProps } from "react-native";

export type ThemedViewProps = {} & ViewProps;

export function ThemedView({ className = "", ...rest }: ThemedViewProps) {
  return <View className={className + "bg-white dark:bg-black "} {...rest} />;
}
