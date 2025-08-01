import InnerNavBar from "@/components/InnerNavBar";
import Recommendation from "@/components/my-recommendations/Recommendation";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Recommandation } from "@/types";
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

export interface CompleteRecommendation extends Recommandation {
  initiator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  recipient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  company: {
    id: string;
    name: string;
    email: string;
  };
}

export default function MyRecommendations() {
  const { API_URL, userId } = useContext(AppContext);
  const [completeReceived, setCompleteReceived] = useState<
    CompleteRecommendation[]
  >([]);
  const [completeSent, setCompleteSent] = useState<CompleteRecommendation[]>(
    [],
  );
  const [page, setPage] = useState<string>("sent");
  const currentList = page === "sent" ? completeSent : completeReceived;

  useEffect(() => {
    axios.get(`${API_URL}/recommandation/user/${userId}`).then((response) => {
      const resp = response.data;
      setCompleteReceived(resp.received);
      setCompleteSent(resp.sent);
    });
  }, [API_URL, userId]);

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
            {currentList && currentList.length > 0 ? (
              currentList.map((rec) => (
                <Recommendation
                  key={rec.id + page}
                  recommandation={rec}
                  page={page}
                />
              ))
            ) : (
              <Text style={styles.noRecommendations}>
                Aucune recommandation {page === "sent" ? "envoyée" : "reçue"}.
              </Text>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
