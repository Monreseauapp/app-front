import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        height: 90,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        Je m'inscris
      </Text>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        (inscription obligatoire)
      </Text>
      <Pressable
        style={[styles.button, { marginTop: 40 }]}
        onPress={() => {
          router.push({
            pathname: "/signup",
            params: { type: "company" },
          });
        }}
      >
        <Text style={styles.buttonText}>Devenir membre (entreprise)</Text>
      </Pressable>
      <Pressable
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => {
          router.push({
            pathname: "/signup",
            params: { type: "guest" },
          });
        }}
      >
        <Text style={styles.buttonText}>Je découvre mon réseau</Text>
      </Pressable>
      <Link href="/signin" style={{ marginTop: 40 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: Colors.accent,
            textDecorationLine: "underline",
          }}
        >
          Je possède déjà un compte
        </Text>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    padding: 6,
    color: Colors.background,
    fontWeight: "bold",
  },
});
