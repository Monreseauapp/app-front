import TabBar from "@/components/TabBar";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Tabs, usePathname } from "expo-router";
import { useContext } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function TabLayout() {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
  const route = usePathname();
  const isIndex = route === "/";
  return (
    <Tabs
      tabBar={
        (props) => (
          // isIndex && (
          <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
            <View
              style={{
                ...styles.tabBarContainer,
                width: isMenuOpen ? "100%" : 200,
                height: isMenuOpen ? "100%" : 90,
              }}
            >
              <Pressable onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <Text style={styles.menuButton}>Menu</Text>
              </Pressable>
              {isMenuOpen && <TabBar {...props} />}
            </View>
          </TouchableWithoutFeedback>
        )
        // )
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
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

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 100,
    left: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: Colors.accent,
    color: Colors.background,
    borderRadius: 25,
    alignItems: "center",
    zIndex: 100,
  },
  tabBarContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
