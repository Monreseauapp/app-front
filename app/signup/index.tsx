import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";

type paramsType = {
  type: "company" | "guest";
};

export default function ConditionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<paramsType>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>
        PORTAIL {params.type === "company" ? "ENTREPRISES" : "VISITEURS"}
      </Text>
      <Text style={[styles.subtitle, { marginVertical: 30 }]}>
        Avant de continuer,
      </Text>
      {params.type === "company" && (
        <>
          <Text style={styles.text}>
            L'inscription sur <Text style={styles.span}>Mon Réseau</Text> se
            fait en plusieurs étapes :
          </Text>
          <View style={styles.listElem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.text}>
              Tout d'abord, un <Text style={styles.span}>formulaire </Text>
              d'inscription à remplir dès maintenant,
            </Text>
          </View>
          <View style={styles.listElem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.text}>
              Ensuite, ajoutez vos <Text style={styles.span}>documents </Text>
              et <Text style={styles.span}>certifications</Text> au
              questionnaire d'adhésion,
            </Text>
          </View>
          <View style={styles.listElem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.text}>
              Procédez au <Text style={styles.span}>paiement </Text>
              de votre abonnement,
            </Text>
          </View>
          <View style={styles.listElem}>
            <Text style={styles.bullet}>{"\u2022"}</Text>
            <Text style={styles.text}>
              Inscrivez-vous, lisez et validez les contrats d'adhésion et{" "}
              <Text style={styles.span}>mentions légales</Text>,
            </Text>
          </View>
        </>
      )}
      {params.type === "guest" && (
        <>
          <Text style={{ ...styles.text, marginTop: 16 }}>
            Inscrivez-vous, lisez et validez les contrats d'adhésion et{" "}
            <Text style={styles.span}>mentions légales</Text>,
          </Text>
        </>
      )}
      <Text
        style={{
          ...styles.subtitle,
          fontSize: 22,
          marginVertical: 30,
          textAlign: "center",
        }}
      >
        Et accédez à l'application pour exploiter tout son potentiel.
      </Text>
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/signup/form",
            params: { type: params.type },
          });
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            backgroundColor: Colors.background,
            color: Colors.accent,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 100,
          }}
        >
          Continuer
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.accent,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: Colors.accent,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 16,
  },
  span: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: Colors.background,
  },
  listElem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    maxWidth: "95%",
  },
  bullet: {
    fontSize: 24,
    marginRight: 8,
    color: Colors.background,
  },
});
