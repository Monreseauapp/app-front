import Context from "@/context/context";
import { WindowDimensionsProvider } from "@/context/WindowDimensionsContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <WindowDimensionsProvider>
        <Context>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            showHideTransition={"slide"}
            animated={true}
            translucent
          />

          <Stack
            screenOptions={{ headerShown: false, gestureEnabled: true }}
            initialRouteName="(auth)"
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Context>
      </WindowDimensionsProvider>
    </>
  );
}
