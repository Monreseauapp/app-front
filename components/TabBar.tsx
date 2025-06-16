import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Text } from "@react-navigation/elements";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabBar({ state, descriptors, navigation }: any) {
  const { setIsMenuOpen } = useContext(AppContext);
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        // if (route.name === "index") return;
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
                color: isFocused ? Colors.accent : Colors.accent,
                fontWeight: "bold",
                fontSize: 16,
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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    top: 145,
    left: 40,
    width: 200,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  tabBarItem: {
    position: "relative",
    flex: 1,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 25,
    shadowColor: "black",
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
});
