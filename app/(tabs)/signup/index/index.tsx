import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./index.styles";

type paramsType = {
  type: "company" | "guest";
};

export default function ConditionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<paramsType>();
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/images/blue-logo.png")}
        style={Platform.OS === "web" ? webStyles.logo : styles.logo}
      />
      <View
        style={{
          marginTop: Platform.OS === "web" ? (width < 600 ? 25 : 150) : 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>
          PORTAIL {params.type === "company" ? "ENTREPRISES" : "VISITEURS"}
        </Text>
        <Text
          style={Platform.select({
            web: webStyles.subtitle,
            default: styles.subtitle,
          })}
        >
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
          style={Platform.select({
            web: webStyles.subtitle,
            default: {
              ...styles.subtitle,
              fontSize: 22,
            },
          })}
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
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 50,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.violet,
            }}
          >
            Continuer
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
