import RightArrow from "@/assets/icons/right-arrow.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import { Link } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

interface RelatedPeopleProps {
  initiator: User | undefined;
  company: Company | undefined;
  isCompanyReception: boolean;
}

export default function RelatedPeople({
  initiator,
  company,
  isCompanyReception,
}: RelatedPeopleProps) {
  const { userId } = useContext(AppContext);
  return (
    <>
      <View style={styles.nameContainer}>
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
