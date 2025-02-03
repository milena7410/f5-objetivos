import { Tabs } from "expo-router";

import * as React from "react";
import { Platform } from "react-native";

import { HapticTab } from "~/components/HapticTab";
import { CheckListIcon } from "~/components/ui/Icons";
import TabBarBackground from "~/components/ui/TabBarBackground";
import { useThemeColors } from "~/hooks/useThemeColor";

const getIconColor = (focused: boolean) =>
  focused
    ? "text-primary dark:text-white"
    : "text-primary/50 dark:text-white/50";
export default function TabLayout() {
  const color = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: color.tint,
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
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <CheckListIcon size={size} className={getIconColor(focused)} />
          ),
        }}
      />
      <Tabs.Screen
        name="example"
        options={{
          title: "Exemplo",
          tabBarIcon: ({ size, focused }) => (
            <CheckListIcon size={size} className={getIconColor(focused)} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ size, focused }) => (
            <CheckListIcon size={size} className={getIconColor(focused)} />
          ),
        }}
      />
    </Tabs>
  );
}
