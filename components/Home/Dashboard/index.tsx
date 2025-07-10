import PlusIcon from "@/assets/icons/plus.svg";
import DashboardStats from "@/components/DashboardStats";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Recommandation } from "@/types";
import axios from "axios";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import { styles, webStyles } from "./Dashboard.styles";

export default function Dashboard() {
  const { userId, companyId } = useContext(AppContext);
  const { width } = Dimensions.get("window");
  const [recommandationsSent, setRecommandationsSent] = useState<
    Recommandation[]
  >([]);
  const [recommandationsReceived, setRecommandationsReceived] = useState<
    Recommandation[]
  >([]);

  useEffect(() => {
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
    fetchRecommandationsSent();
    fetchRecommandationsReceived();
    fetchRecommandationsReceivedCompany();
  }, [userId, companyId]);

  return (
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
          <>
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
            <DashboardStats
              title="Mes chiffres"
              stats={[
                { label: "Encaissés", value: "/" },
                { label: "Données", value: "/" },
              ]}
            />
          </>
        )}
      </View>
      <View>
        {!companyId && (
          <Link
            style={{
              marginTop: width >= 600 || Platform.OS !== "web" ? 50 : 25,
              backgroundColor: Colors.violet,
              padding: 15,
              borderRadius: 50,
            }}
            href="/recommendation"
          >
            <PlusIcon width={50} height={50} color={Colors.white} />
          </Link>
        )}
      </View>
    </View>
  );
}
