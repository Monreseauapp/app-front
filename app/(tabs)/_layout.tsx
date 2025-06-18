import TabBar from "@/components/TabBar";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { BlurView } from "expo-blur";
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

  const isTabBarVisible = ["/", "/recommendation"].some(
    (path) => route === path || route.startsWith(path + "/")
  );
  return (
    <Tabs
      backBehavior="history"
      tabBar={
        (props) => (
          // isTabBarVisible && (
          <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
            <View
              style={{
                ...styles.tabBarContainer,
                width: isMenuOpen ? "100%" : 200,
                height: isMenuOpen ? "100%" : 90,
              }}
            >
              <BlurView
                intensity={7}
                style={{
                  width: isMenuOpen ? "100%" : 0,
                  height: isMenuOpen ? "100%" : 0,
                }}
              >
                <Pressable onPress={() => setIsMenuOpen(!isMenuOpen)}>
                  <Text style={styles.menuButton}>Menu</Text>
                </Pressable>
                {isMenuOpen && <TabBar {...props} />}
              </BlurView>
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
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
        }}
      />
      <Tabs.Screen
        name="recommendation/index"
        options={{
          title: "Recommendations",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 70,
    left: 290,
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
