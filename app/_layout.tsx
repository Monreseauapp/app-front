import Context from "@/context/context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Context>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          showHideTransition={"slide"}
          animated={true}
          translucent
        />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Context>
    </>
  );
}
