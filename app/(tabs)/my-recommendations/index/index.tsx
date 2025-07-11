import InnerNavBar from "@/components/InnerNavBar";
import Recommendation from "@/components/my-recommendations/Recommendation";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Recommandation, User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./index.styles";

export interface CompleteRecommendation {
  recommandation: Recommandation;
  initiator?: User;
  recipient?: User;
  company?: Company;
}

export default function MyRecommendations() {
  const { API_URL, companyId } = useContext(AppContext);
  const [recommandationsReceived, setRecommandationsReceived] = useState<
    Recommandation[]
  >([]);
  const [recommandationsSent, setRecommandationsSent] = useState<
    Recommandation[]
  >([]);
  const [completeReceived, setCompleteReceived] = useState<
    CompleteRecommendation[]
  >([]);
  const [completeSent, setCompleteSent] = useState<CompleteRecommendation[]>(
    []
  );
  const [page, setPage] = useState<string>("sent");
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendationsReceived = async () => {
      const [recipientReceived, companyReceived] = await Promise.all([
        axios
          .get(`${API_URL}/recommandation/company-recipients/${companyId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching recommendations:", error.request);
          }),

        axios
          .get(`${API_URL}/recommandation/company/${companyId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching recommendations:", error.request);
          }),
      ]);
      setRecommandationsReceived([...recipientReceived, ...companyReceived]);
    };
    const fetchRecommendationsSent = async () => {
      axios
        .get(`${API_URL}/recommandation/company-initiators/${companyId}`)
        .then((response) => {
          setRecommandationsSent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error.request);
        });
    };
    fetchRecommendationsReceived();
    fetchRecommendationsSent();
    if (updated) {
      setUpdated(false);
    }
  }, [companyId, updated, API_URL]);

  const fetchCompleteRecommendations = async (
    recommendations: Recommandation[]
  ) => {
    const completeRecommendation: CompleteRecommendation[] = await Promise.all(
      recommendations.map(async (reco) => {
        const initiator = await axios
          .get(`${API_URL}/users/${reco.initiatorId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching user data", error.request);
          });
        const recipient = await axios
          .get(`${API_URL}/users/${reco.recipientId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching user data", error.request);
          });
        const company = await axios
          .get(`${API_URL}/company/${reco.companyId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching user data", error.request);
          });
        return {
          recommandation: reco,
          initiator: initiator,
          recipient: reco.recipientId ? recipient : null,
          company: company,
        };
      })
    );
    return completeRecommendation;
  };

  useEffect(() => {
    const setCompleteRecommendations = async () => {
      const completeReceived = await fetchCompleteRecommendations(
        recommandationsReceived
      );
      const completeSent = await fetchCompleteRecommendations(
        recommandationsSent
      );
      setCompleteReceived(
        completeReceived.filter((rec, index) => {
          return (
            completeReceived.findIndex(
              (r) => r.recommandation.id === rec.recommandation.id
            ) !== index
          );
        })
      );
      setCompleteSent(
        completeSent.filter((rec, index) => {
          return (
            completeReceived.findIndex(
              (r) => r.recommandation.id === rec.recommandation.id
            ) !== index
          );
        })
      );
    };
    if (recommandationsReceived.length > 0 || recommandationsSent.length > 0) {
      setCompleteRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommandationsReceived, recommandationsSent]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "web" ? -30 : 0,
      }}
    >
      <Text style={styles.title}>Mes Recommandations</Text>
      <InnerNavBar
        tabs={["Envoyées", "Reçues"]}
        activeIndex={page === "sent" ? 0 : 1}
        setActiveIndex={() => setPage(page === "sent" ? "received" : "sent")}
        style={{ alignSelf: "center", marginLeft: "-4%" }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback
          onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
        >
          <ScrollView
            style={{
              flex: 1,
              width: "100%",
              marginTop: 20,
              backgroundColor: Colors.white,
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: Platform.OS === "web" ? "row" : "column",
              flexWrap: Platform.OS === "web" ? "wrap" : "nowrap",
              gap: 20,
            }}
          >
            {(page === "sent" ? completeSent : completeReceived).map((rec) => (
              <Recommendation
                key={rec.recommandation.id + page}
                {...rec}
                page={page}
                setUpdated={setUpdated}
              />
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
