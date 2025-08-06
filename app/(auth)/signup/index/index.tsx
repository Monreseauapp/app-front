import { Colors } from "@/constants/Colors";
import {
  RelativePathString,
  useRouter,
  useLocalSearchParams,
} from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./index.styles";
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && type !== "company" && type !== "guest") {
    router.replace("/" as RelativePathString);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/images/blue-logo.png")}
        style={Platform.OS === "web" ? webStyles.logo : styles.logo}
      />
      <View
        style={{
          marginTop: Platform.OS === "web" ? 25 : 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={Platform.select({
            web: webStyles.title,
            default: styles.title,
          })}
        >
          PORTAIL {type === "company" ? "ENTREPRISES" : "VISITEURS"}
        </Text>
        <Text
          style={Platform.select({
            web: webStyles.subtitle,
            default: styles.subtitle,
          })}
        >
          Avant de continuer,
        </Text>
        {type === "company" && (
          <>
            <Text style={styles.text}>
              L&apos;inscription sur <Text style={styles.span}>Mon Réseau</Text>{" "}
              se fait en plusieurs étapes :
            </Text>
            <View style={styles.listElem} testID="signup-company-steps">
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.text}>
                Tout d&apos;abord, un{" "}
                <Text style={styles.span}>formulaire </Text>
                d&apos;inscription à remplir dès maintenant,
              </Text>
            </View>
            <View style={styles.listElem}>
              <Text style={styles.bullet}>{"\u2022"}</Text>
              <Text style={styles.text}>
                Ensuite, ajoutez vos <Text style={styles.span}>documents </Text>
                et <Text style={styles.span}>certifications</Text> au
                questionnaire d&apos;adhésion,
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
                Inscrivez-vous, lisez et validez les contrats d&apos;adhésion et{" "}
                <Text style={styles.span}>mentions légales</Text>,
              </Text>
            </View>
          </>
        )}
        {type === "guest" && (
          <>
            <Text
              style={{ ...styles.text, marginTop: 16 }}
              testID="signup-guest-steps"
            >
              Inscrivez-vous, lisez et validez les contrats d&apos;adhésion et{" "}
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
          Et accédez à l&apos;application pour exploiter tout son potentiel.
        </Text>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/signup/form",
              params: { type: type },
            });
          }}
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 50,
            alignSelf: "center",
          }}
          testID="signup-continue-button"
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
    </ScrollView>
  );
}
