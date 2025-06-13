import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.background,
        tabBarInactiveTintColor: Colors.accent,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            width: "50%",
            alignSelf: "center",
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
          default: {
            backgroundColor: "transparent",
            borderRadius: 100,
            elevation: 5,
            alignSelf: "center",
            borderTopWidth: 0,
          },
        }),
        tabBarItemStyle: {
          borderRadius: 100,
          backgroundColor: Colors.accent,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          tabBarStyle: {
            display: "none", // Hide the tab bar for the index screen
          },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
