import { Tabs } from "expo-router";

import * as React from "react";
import { Platform } from "react-native";

import { HapticTab } from "~/components/HapticTab";
import { Icons } from "~/components/atoms/Icons";
import TabBarBackground from "~/components/ui/TabBarBackground";
import { useThemeColors } from "~/hooks/useThemeColor";

const getIconColor = (focused: boolean) =>
  focused
    ? " text-primary-500 dark:text-white"
    : " text-primary/50 dark:text-white/50";
export default function TabLayout() {
  const color = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lista",
          tabBarIcon: ({ size, focused }) => (
            <Icons
              name="checklist"
              type="octicons"
              size={size}
              className={getIconColor(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="example"
        options={{
          title: "Feito",
          tabBarIcon: ({ size, focused }) => (
            <Icons
              name="check-square"
              type="feather"
              size={size}
              className={getIconColor(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "A fazer",
          tabBarIcon: ({ size, focused }) => (
            <Icons
              name="square"
              type="feather"
              size={size}
              className={getIconColor(focused)}
            />
          ),
        }}
      />
    </Tabs>
  );
}
