import BackIcon from "@/assets/icons/back.svg";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./index.styles";

export default function RecommendationChoice() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backIcon}
        hitSlop={20}
      >
        <BackIcon color={Colors.accent} width={30} height={30} />
      </Pressable>
      <Text style={styles.title}>JE DEPOSE UNE RECOMMANDATION</Text>
      <Link style={styles.button} href="/recommendation/form?type=company">
        <Text style={styles.buttonText}>Je recommande une entreprise</Text>
      </Link>
      <Link style={styles.button} href="/recommendation/form?type=lead">
        <Text style={styles.buttonText}>J'apporte un prospect</Text>
      </Link>
      <Link style={styles.button} href="/recommendation/form?type=project">
        <Text style={styles.buttonText}>Je dépose un projet</Text>
      </Link>
    </View>
  );
}
