import RightArrow from "@/assets/icons/right-arrow.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Recommandation, RecoState, User } from "@/types";
import { Link } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

interface RelatedPeopleProps {
  recommendation: Recommandation | undefined;
  recipient: User | undefined;
  initiator: User | undefined;
  company: Company | undefined;
  isCompanyReception: boolean;
}

export default function RelatedPeople({
  recommendation,
  recipient,
  initiator,
  company,
  isCompanyReception,
}: RelatedPeopleProps) {
  const { userId } = useContext(AppContext);
  const arrowColor = () => {
    if (
      recommendation?.RecoStateCompany === RecoState.REJECTED ||
      recommendation?.RecoStateInitiator === RecoState.REJECTED
    ) {
      return Colors.red;
    } else if (
      recommendation?.RecoStateCompany === RecoState.ACCEPTED ||
      recommendation?.RecoStateInitiator === RecoState.ACCEPTED
    ) {
      return Colors.green;
    }
    return Colors.background;
  };
  return (
    <>
      <View style={styles.nameContainer}>
        <Link href={`/profil?profilId=${recipient?.id}`}>
          <Text
            style={[
              styles.text,
              styles.name,
              userId === recipient?.id ? styles.span : "",
            ]}
          >
            {recipient?.firstName} {recipient?.lastName}
          </Text>
        </Link>
        <RightArrow width={40} height={40} color={Colors.background} />
        <Link href={`/profil?profilId=${company?.ownerId}`}>
          <Text
            style={[
              styles.text,
              styles.name,
              isCompanyReception ? styles.span : "",
            ]}
          >
            {company?.name}
          </Text>
        </Link>
      </View>
      <Link href={`/profil?profilId=${initiator?.id}`}>
        <Text
          style={[
            styles.text,
            styles.name,
            userId === initiator?.id ? styles.span : "",
          ]}
        >
          {initiator?.firstName} {initiator?.lastName}
        </Text>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  nameContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontStyle: "italic",
  },
});
