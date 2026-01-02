import { useColors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colors = useColors();
  const currentRoute = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface[300],
          borderTopColor: colors.surface[200],
          borderTopWidth: 2,
        },
        headerStyle: {
          backgroundColor: colors.surface[300],
          borderBottomColor: colors.surface[200],
          borderBottomWidth: 2,
        },
        headerTintColor: colors.content[500],
      }}
    >
      <Tabs.Screen
        name="moments"
        options={{
          title: "",
          tabBarIcon: () => (
            <TabBarIcon
              name={currentRoute === "/moments" ? "images" : "images-outline"}
              color={
                currentRoute === "/moments"
                  ? colors.content[500]
                  : colors.content[300]
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: () => (
            <TabBarIcon
              name={currentRoute === "/" ? "calendar" : "calendar-outline"}
              color={
                currentRoute === "/" ? colors.content[500] : colors.content[300]
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: () => (
            <TabBarIcon
              name={
                currentRoute === "/settings" ? "settings" : "settings-outline"
              }
              color={
                currentRoute === "/settings"
                  ? colors.content[500]
                  : colors.content[300]
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
