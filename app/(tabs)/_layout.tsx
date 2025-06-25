import TabBar from "@/components/TabBar";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { BlurView } from "expo-blur";
import { Tabs, usePathname } from "expo-router";
import { useContext } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function TabLayout() {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
  const route = usePathname();

  const isTabBarInvisible = [
    // "/",
    "/recommendation",
    "/legal",
    "/profil/modify",
  ].some((path) => route === path || route.startsWith(path + "/"));

  const isLogoInvisible = ["/", "/legal"].some(
    (path) => route === path || route.startsWith(path + "/")
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {!isLogoInvisible && (
        <Image
          source={require("@/assets/images/white-logo.png")}
          style={styles.logo}
        />
      )}
      <Tabs
        backBehavior="history"
        tabBar={(props) =>
          !isTabBarInvisible && (
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
            title: "Menu principal",
          }}
        />
        <Tabs.Screen
          name="profil/index"
          options={{
            title: "Mon Profil",
          }}
        />
        <Tabs.Screen
          name="recommendation/index"
          options={{
            title: "Recommandations",
          }}
        />
        <Tabs.Screen
          name="legal/legalNotice"
          options={{
            title: "Mentions légales",
          }}
        />
        <Tabs.Screen
          name="profil/modify"
          options={{
            title: "Modifier mon profil",
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Mes notifications",
          }}
        />
        <Tabs.Screen
          name="demoSignature"
          options={{
            title: "Démo de signature",
          }}
        />
        <Tabs.Screen
          name="recommendation/form"
          options={{
            title: "Faire une recommandation",
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 70,
    left: 310,
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
    zIndex: 10,
  },
  logo: {
    width: 160,
    height: 50,
    marginBottom: 20,
    position: "absolute",
    top: 70,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 2,
  },
});
