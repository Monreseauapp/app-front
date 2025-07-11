import RightArrow from "@/assets/icons/right-arrow.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Recommandation, RecoState, User } from "@/types";
import { Link } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import styles from "./RelatedPeople.styles";

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
      recommendation?.RecoStateRecipient === RecoState.REJECTED
    ) {
      return Colors.red;
    } else if (
      recommendation?.RecoStateCompany === RecoState.ACCEPTED ||
      recommendation?.RecoStateRecipient === RecoState.ACCEPTED
    ) {
      return Colors.green;
    }
    return Colors.white;
  };
  return (
    <>
      <View style={styles.nameContainer}>
        <Link
          href={{
            pathname: "/profil/[id]",
            params: { id: recipient?.id || "", media: "yes" },
          }}
        >
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
        <RightArrow width={40} height={40} color={arrowColor()} />
        <Link
          href={{
            pathname: "/profil/[id]",
            params: { id: company?.id || "", media: "yes" },
          }}
        >
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
      <Link
        href={{
          pathname: "/profil/[id]",
          params: { id: initiator?.id || "", media: "yes" },
        }}
      >
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
