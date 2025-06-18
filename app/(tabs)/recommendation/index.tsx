import BackIcon from "@/assets/icons/back.svg";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    width: "90%",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
  backIcon: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    padding: 20,
  },
});
