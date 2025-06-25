import NotificationIcon from "@/assets/icons/notification.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import DashboardStats from "@/components/DashboardStats";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Recommandation, User } from "@/types";
import axios from "axios";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { userId, accountType } = useContext(AppContext);
  const [user, setUser] = useState<User | null>(null);
  const [recommandationsSent, setRecommandationsSent] = useState<
    Recommandation[]
  >([]);
  const [recommandationsReceived, setRecommandationsReceived] = useState<
    Recommandation[]
  >([]);

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
    const fetchRecommandationsSent = async () => {
      axios
        .get(
          `${process.env.EXPO_PUBLIC_API_URL}/recommandation/initiator/${userId}`
        )
        .then((response) => {
          setRecommandationsSent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recommandations:", error.request);
        });
    };
    const fetchRecommandationsReceived = async () => {
      axios
        .get(
          `${process.env.EXPO_PUBLIC_API_URL}/recommandation/recipient/${userId}`
        )
        .then((response) => {
          setRecommandationsReceived(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recommandations:", error.request);
        });
    };
    const fetchRecommandationsReceivedCompany = async () => {
      if (user?.companyId) {
        axios
          .get(
            `${process.env.EXPO_PUBLIC_API_URL}/recommandation/company/${user.companyId}`
          )
          .then((response) => {
            setRecommandationsReceived((prev) => [...prev, ...response.data]);
          })
          .catch((error) => {
            console.error("Error fetching recommandations:", error.request);
          });
      }
    };
    if (userId) {
      fetchUserData();
      fetchRecommandationsSent();
      fetchRecommandationsReceived();
      fetchRecommandationsReceivedCompany();
    }
  }, [userId, user?.companyId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Link
        href="/notification"
        style={{
          position: "absolute",
          top: 70,
          left: 40,
        }}
      >
        <NotificationIcon width={40} height={40} color={Colors.accent} />
      </Link>
      {accountType === "guest" && (
        <View style={{ alignItems: "center", width: "90%" }}>
          <Text style={styles.title}>MON PROFIL</Text>
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
                alignItems: "flex-start",
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
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.title, marginBottom: 10 }}>
          MON TABLEAU DE BORD
        </Text>
        <DashboardStats
          title="Mes recommandations"
          stats={[
            {
              label: "En cours",
              value: recommandationsSent
                .filter((r) => r.RecoState === "PENDING")
                .length.toString(),
            },
            {
              label: "Terminées",
              value: recommandationsSent
                .filter((r) => r.RecoState === "ACCEPTED")
                .length.toString(),
            },
          ]}
        />
        {accountType === "company" && (
          <>
            <DashboardStats
              title="Mes recommandations reçues"
              stats={[
                {
                  label: "En cours",
                  value: recommandationsReceived
                    .filter((r) => r.RecoState === "PENDING")
                    .length.toString(),
                },
                {
                  label: "Terminées",
                  value: recommandationsReceived
                    .filter((r) => r.RecoState === "ACCEPTED")
                    .length.toString(),
                },
              ]}
            />
            <DashboardStats
              title="Mes chiffres"
              stats={[
                { label: "Encaissés", value: "7885€" },
                { label: "Données", value: "1568€" },
              ]}
            />
          </>
        )}
      </View>
      {accountType === "guest" && (
        <Link
          style={{
            marginTop: 50,
            backgroundColor: Colors.accent,
            padding: 15,
            borderRadius: 50,
          }}
          href="/recommendation"
        >
          <PlusIcon width={50} height={50} color={Colors.background} />
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.accent,
    marginTop: 50,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 20,
  },
});
