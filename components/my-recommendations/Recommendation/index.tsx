import { CompleteRecommendation } from "@/app/(tabs)/my-recommendations/index/index";
import { AppContext } from "@/context/context";
import { RecoState } from "@/types";
import axios from "axios";
import { useContext, useState } from "react";
import { Linking, Platform, Pressable, Text, View } from "react-native";
import ValidationForm from "../../ValidationForm";
import RelatedPeople from "../RelatedPeople";
import { styles, webStyles } from "./Recommendation.styles";

interface RecommendationProps extends CompleteRecommendation {
  page: string;
  setUpdated: (value: boolean) => void;
}

export default function Recommendation({
  recommandation,
  recipient,
  initiator,
  company,
  page,
  setUpdated,
}: RecommendationProps) {
  const { companyId, API_URL } = useContext(AppContext);
  const isCompanyReception = companyId === company?.id;
  const [isRejected, setIsRejected] = useState<boolean | undefined>(undefined);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const stateTranslation = {
    [RecoState.ACCEPTED]: "Acceptée",
    [RecoState.PENDING]: "En attente...",
    [RecoState.REJECTED]: "Refusée",
  };
  const colorState = {
    [RecoState.ACCEPTED]: styles.accepted,
    [RecoState.PENDING]: {},
    [RecoState.REJECTED]: styles.rejected,
  };

  const updateRecommendation = async () => {
    axios.patch(
      `${API_URL}/recommandation/${recommandation.id}`,
      isCompanyReception
        ? {
            RecoStateCompany: isRejected
              ? RecoState.REJECTED
              : RecoState.ACCEPTED,
            rejectionReasonCompany: rejectionReason,
          }
        : {
            RecoStateRecipient: isRejected
              ? RecoState.REJECTED
              : RecoState.ACCEPTED,
            rejectionReasonRecipient: rejectionReason,
          }
    );
  };

  return (
    <View
      style={Platform.OS === "web" ? webStyles.container : styles.container}
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        <RelatedPeople
          recommendation={recommandation}
          recipient={recipient}
          initiator={initiator}
          company={company}
          isCompanyReception={isCompanyReception}
        />
        <Text style={[styles.text, styles.description]}>
          {recommandation.description}
        </Text>
        {page === "received" && (
          <View style={styles.contactContainer}>
            <Text style={[styles.text, styles.span]}>Contact :</Text>
            <View style={styles.contactTextContainer}>
              {(isCompanyReception ? recipient : company)?.email && (
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `mailto:${
                        (isCompanyReception ? recipient : company)?.email
                      }`
                    )
                  }
                  style={{ width: "45%" }}
                >
                  <Text style={[styles.text, styles.contactText]}>
                    {(isCompanyReception ? recipient : company)?.email}
                  </Text>
                </Pressable>
              )}
              {(isCompanyReception ? recipient : company)?.phone && (
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `tel:${(isCompanyReception ? recipient : company)?.phone}`
                    )
                  }
                  style={{ width: "45%" }}
                >
                  <Text style={[styles.text, styles.contactText]}>
                    {(isCompanyReception ? recipient : company)?.phone}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
        <View style={styles.stateContainer}>
          <Text
            style={[
              styles.text,
              styles.span,
              colorState[recommandation.RecoStateRecipient as RecoState],
            ]}
          >
            {stateTranslation[recommandation.RecoStateRecipient as RecoState]}
          </Text>
          <Text
            style={[
              styles.text,
              styles.span,
              colorState[recommandation.RecoStateCompany as RecoState],
            ]}
          >
            {stateTranslation[recommandation.RecoStateCompany as RecoState]}
          </Text>
        </View>
      </View>
      {page === "received" &&
        (isCompanyReception
          ? recommandation.RecoStateCompany
          : recommandation.RecoStateRecipient) === RecoState.PENDING && (
          <ValidationForm
            isRejected={isRejected}
            setIsRejected={setIsRejected}
            rejectionReason={rejectionReason}
            setRejectionReason={setRejectionReason}
            update={updateRecommendation}
            setUpdated={setUpdated}
          />
        )}
    </View>
  );
}
