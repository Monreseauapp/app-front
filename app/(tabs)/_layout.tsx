import BackIcon from "@/assets/icons/back.svg";
import TabBar from "@/components/TabBar";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import useFetchUserStatus from "@/hooks/useFetchUserStatus";
import { Company } from "@/types";
import axios from "axios";
import { BlurView } from "expo-blur";
import {
  RelativePathString,
  Tabs,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import { useContext, useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function TabLayout() {
  const { isMenuOpen, setIsMenuOpen, userId, companyId, API_URL } =
    useContext(AppContext);
  const { hasActiveSubscription, hasAgreedToTerms, isLoading } =
    useFetchUserStatus();
  const isLoggedIn = !!userId;
  const router = useRouter();
  const route = usePathname();
  const navigation = useNavigation();
  const history = navigation.getState()?.routes[0].state?.history;
  const isTabsRoute = [
    "/home",
    "/profil",
    "/my-recommendations",
    "/my-projects",
    "/recommendation",
    "/profil",
    "/notification",
  ].some((path) => route.startsWith(path));

  useEffect(() => {
    if (!isLoggedIn && userId !== undefined && isTabsRoute) {
      router.replace("/" as unknown as RelativePathString);
    }
  }, [isLoggedIn, userId, router, route, isTabsRoute]);

  useEffect(() => {
    const fetchCompany = async () => {
      return await axios
        .get(`${API_URL}/company/${companyId}`)
        .then((response) => {
          const company: Company = response.data;
          return company;
        });
    };
    const checkRedirect = async () => {
      if (
        !isLoading &&
        userId &&
        companyId &&
        hasActiveSubscription !== null &&
        hasAgreedToTerms !== null
      ) {
        const company: Company = await fetchCompany();
        if (!hasActiveSubscription) {
          router.replace(
            `/payment/subscription?email=${company.email}&redirect=${hasAgreedToTerms ? "/home" : encodeURIComponent(`/legal/legalNotice?email=${company.email}&redirect=/home`)}` as RelativePathString
          );
        } else if (!hasAgreedToTerms) {
          router.replace(
            `/legal/legalNotice?redirect=/home&email=${company.email}` as RelativePathString
          );
        }
      }
    };
    checkRedirect();
  }, [
    isLoading,
    hasActiveSubscription,
    hasAgreedToTerms,
    router,
    userId,
    companyId,
    API_URL,
  ]);

  const isTabBarInvisible = [
    // "/index",
    "/recommendation",
    "/legal",
    "/profil/modify",
    "/signin",
    "/signup",
  ].some((path) => route === path || route.startsWith(path + "/"));

  const isLogoInvisible = [
    "/index",
    "/legal",
    "/profil/modify",
    "/signin",
    "/signup",
  ].some((path) => route === path || route.startsWith(path + "/"));

  const isBackButtonVisible = [
    "/notification",
    "/profil",
    "/recommendation",
  ].some((path) => route === path || route.startsWith(path + "/"));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {isBackButtonVisible && (
        <Pressable
          style={Platform.OS === "web" ? webStyles.backIcon : styles.backIcon}
          onPress={() => history && router.back()}
        >
          <BackIcon width={35} height={35} color={Colors.violet} />
        </Pressable>
      )}
      {!isLogoInvisible && (
        <Image
          source={require("@/assets/images/white-logo.png")}
          style={Platform.select({
            web: webStyles.logo,
            default: styles.logo,
          })}
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
                  width: isMenuOpen ? "100%" : 0,
                  height: isMenuOpen ? "100%" : 0,
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
                    <Text
                      style={Platform.select({
                        web: webStyles.menuButton,
                        default: styles.menuButton,
                      })}
                    >
                      Menu
                    </Text>
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
          name="home/index"
          options={{
            title: "Tableau de bord",
          }}
        />
        <Tabs.Screen
          name="profil/index/index"
          options={{
            title: "Mon Profil",
          }}
        />
        <Tabs.Screen
          name="my-recommendations/index/index"
          options={{
            title: "Mes Recommandations",
          }}
        />
        <Tabs.Screen
          name="my-projects/index/index"
          options={{
            title: "Mes Projets",
          }}
        />
        <Tabs.Screen
          name="recommendation/index/index"
          options={{
            title: "Recommandations",
          }}
        />
        <Tabs.Screen
          name="profil/modify/index"
          options={{
            title: "Modifier mon profil",
          }}
        />
        <Tabs.Screen
          name="notification/index"
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
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 70,
    left: width - 110,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: Colors.violet,
    color: Colors.white,
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
  backIcon: {
    position: "absolute",
    top: 70,
    left: 30,
    zIndex: 10,
  },
});

const webStyles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 30,
    left: width >= 768 ? width - 100 - width / 16 : width - 110,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: Colors.violet,
    color: Colors.white,
    borderRadius: 25,
    alignItems: "center",
    zIndex: 100,
  },
  logo: {
    width: width >= 768 ? 320 : 160,
    height: width >= 768 ? 100 : 50,
    marginBottom: 20,
    position: "absolute",
    top: width >= 768 ? 15 : 30,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 2,
  },
  backIcon: {
    position: "absolute",
    top: width > 600 ? 30 : 35,
    left: width >= 768 ? 110 : 30,
    zIndex: 10,
  },
});
