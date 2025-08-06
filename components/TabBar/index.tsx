import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Text } from "@react-navigation/elements";
import { useContext } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { styles, webStyles } from "./TabBar.styles";

export default function TabBar({ state, descriptors, navigation }: any) {
  const { setIsMenuOpen, companyId } = useContext(AppContext);
  const invisibleRoutes: string[] = ["recommendation/form"];
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
    <View
      style={Platform.select({
        web: webStyles.tabBar,
        default: styles.tabBar,
      })}
    >
      {state.routes.map((route: any, index: any) => {
        if (
          isRouteVisible(route.name) ||
          (!companyId && isRouteVisibleGuest(route.name))
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
          setIsMenuOpen && setIsMenuOpen(false);
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
            style={Platform.select({
              web: webStyles.tabBarItem,
              default: styles.tabBarItem,
            })}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text
              style={{
                color: Colors.violet,
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
