import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Text } from "@react-navigation/elements";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./TabBar.styles";

export default function TabBar({ state, descriptors, navigation }: any) {
  const { setIsMenuOpen, accountType } = useContext(AppContext);
  const invisibleRoutes: string[] = [
    // "index",
    // "recommendation/form",
    // "notification",
    // "legal",
    // "profil/modify",
    // "profil/[id]",
  ];
  const invisibleRoutesGuest = ["profil"];

  const isRouteVisible = (route: string) => {
    return (
      invisibleRoutes.some(
        (invisibleRoute) =>
          route === invisibleRoute || route.startsWith(invisibleRoute + "/")
      ) || route.endsWith("styles")
    );
  };

  const isRouteVisibleGuest = (route: string) => {
    return invisibleRoutesGuest.some(
      (invisibleRoute) =>
        route === invisibleRoute || route.startsWith(invisibleRoute + "/")
    );
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        if (
          isRouteVisible(route.name) ||
          (accountType === "guest" && isRouteVisibleGuest(route.name))
        )
          return;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          setIsMenuOpen(false);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text
              style={{
                color: Colors.accent,
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
