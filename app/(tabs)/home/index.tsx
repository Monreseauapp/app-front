import NotificationIcon from "@/assets/icons/notification.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import DashboardStats from "@/components/DashboardStats";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Recommandation, User } from "@/types";
import axios from "axios";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Platform, Text, View } from "react-native";
import styles, { webStyles } from "./home.styles";

export default function Home() {
  const { width } = Dimensions.get("window");
  const { userId, companyId } = useContext(AppContext);
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
      if (companyId) {
        axios
          .get(
            `${process.env.EXPO_PUBLIC_API_URL}/recommandation/company/${companyId}`
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
  }, [userId, companyId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: width >= 600 ? "row" : "column",
        paddingVertical: 20,
        gap: width >= 1024 ? 100 : 50,
      }}
    >
      <Link
        href="/notification"
        style={Platform.select({
          web: webStyles.notification,
          default: styles.notification,
        })}
      >
        <NotificationIcon width={40} height={40} color={Colors.accent} />
      </Link>
      {!companyId && (
        <View
          style={{
            alignItems: "center",
            width: width >= 600 ? "30%" : "90%",
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
      <View
        style={{
          alignItems: "center",
          width: width >= 600 && !companyId ? "30%" : "90%",
        }}
      >
        <Text
          style={{
            ...Platform.select({
              web: webStyles.title,
              default: styles.title,
            }),
            marginBottom: 10,
          }}
        >
          MON TABLEAU DE BORD
        </Text>
        <View style={Platform.OS === "web" && webStyles.dashboardContainer}>
          <DashboardStats
            title="Mes recommandations"
            stats={[
              {
                label: "En cours",
                value: recommandationsSent
                  .filter(
                    (r) =>
                      r.RecoStateCompany === "PENDING" &&
                      r.RecoStateRecipient === "PENDING"
                  )
                  .length.toString(),
              },
              {
                label: "Terminées",
                value: recommandationsSent
                  .filter(
                    (r) =>
                      r.RecoStateCompany !== "PENDING" &&
                      r.RecoStateRecipient === "PENDING"
                  )
                  .length.toString(),
              },
            ]}
          />
          {companyId && (
            <DashboardStats
              title="Mes recommandations reçues"
              stats={[
                {
                  label: "En cours",
                  value: recommandationsReceived
                    .filter(
                      (r) =>
                        r.RecoStateCompany === "PENDING" &&
                        r.RecoStateRecipient === "PENDING"
                    )
                    .length.toString(),
                },
                {
                  label: "Terminées",
                  value: recommandationsReceived
                    .filter(
                      (r) =>
                        r.RecoStateCompany !== "PENDING" &&
                        r.RecoStateRecipient !== "PENDING"
                    )
                    .length.toString(),
                },
              ]}
            />
          )}
          {companyId && (
            <DashboardStats
              title="Mes chiffres"
              stats={[
                { label: "Encaissés", value: "/" },
                { label: "Données", value: "/" },
              ]}
            />
          )}
        </View>
        {!companyId && (
          <Link
            style={{
              marginTop: width >= 600 ? 50 : 0,
              backgroundColor: Colors.accent,
              padding: 15,
              borderRadius: 50,
            }}
            href="/recommendation/index"
          >
            <PlusIcon width={50} height={50} color={Colors.background} />
          </Link>
        )}
      </View>
    </View>
  );
}
