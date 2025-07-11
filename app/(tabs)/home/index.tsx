import NotificationIcon from "@/assets/icons/notification.svg";
import Dashboard from "@/components/Home/Dashboard";
import News from "@/components/Home/News";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { User } from "@/types";
import axios from "axios";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles, { webStyles } from "./home.styles";

export default function Home() {
  const { width } = Dimensions.get("window");
  const { userId, companyId } = useContext(AppContext);
  const [user, setUser] = useState<User | null>(null);
  const MONTHS: Record<number, string> = {
    1: "janvier",
    2: "février",
    3: "mars",
    4: "avril",
    5: "mai",
    6: "juin",
    7: "juillet",
    8: "août",
    9: "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      axios
        .get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          if (userData.createdAt) {
            userData.createdAt = new Date(userData.createdAt);
          }
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.request);
        });
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId, companyId]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: "column",
        paddingVertical: 20,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href="/notification"
        style={Platform.select({
          web: webStyles.notification,
          default: styles.notification,
        })}
      >
        <NotificationIcon width={40} height={40} color={Colors.violet} />
      </Link>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: width >= 600 ? "row" : "column",
          gap: width >= 1024 ? 100 : 50,
          marginTop: width >= 768 ? 100 : 50,
        }}
      >
        {!companyId && (
          <View
            style={{
              alignItems: "center",
              width: width >= 600 ? "30%" : "90%",
              marginBottom: -75,
            }}
          >
            <Text
              style={Platform.select({
                web: webStyles.title,
                default: styles.title,
              })}
            >
              MON PROFIL
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ width: "40%", alignItems: "center" }}>
                <Image
                  source={
                    user?.photoUrl
                      ? { uri: user.photoUrl }
                      : require("@/assets/images/profilepicture.jpg")
                  }
                  style={styles.image}
                />
              </View>
              <View
                style={{
                  width: "60%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -20,
                }}
              >
                <Text
                  style={{ ...styles.profileDescription, fontWeight: "bold" }}
                >
                  {user?.firstName || "Prénom"} {user?.lastName || "Nom"}
                </Text>
                <Text style={styles.profileDescription}>
                  {user?.city || "Ville"}
                </Text>
                <Text style={styles.profileDescription}>
                  Actif depuis{" "}
                  {typeof user?.createdAt === "object"
                    ? MONTHS[user.createdAt.getMonth()] +
                      " " +
                      user.createdAt.getFullYear()
                    : "Date inconnue"}
                </Text>
              </View>
            </View>
            <Link style={styles.button} href="/profil/modify?type=guest">
              <Text style={styles.buttonText}>Modifier mon profil</Text>
            </Link>
          </View>
        )}
        <Dashboard />
      </View>
      <News />
    </ScrollView>
  );
}
