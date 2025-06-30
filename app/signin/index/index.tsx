import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./index.styles";

export default function SignIn() {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.introText}>Connectez-vous pour continuer.</Text>
          <Image
            source={require("@/assets/images/white-logo.png")}
            style={styles.logo}
          />
          <View style={styles.form}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Je me connecte.</Text>
              <Input
                name="Email"
                placeholder="exemple@gmail.com"
                type="email"
              />
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Input
                  name="Mot de passe"
                  placeholder="********"
                  type="current-password"
                />
                <Text
                  onPress={() => {
                    alert(
                      "Mot de passe oublié ? Veuillez suivre les instructions pour réinitialiser votre mot de passe."
                    );
                  }}
                  style={{
                    color: Colors.background,
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: -10,
                    marginBottom: 8,
                    marginLeft: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  Mot de passe oublié ????
                </Text>
              </View>
              <Link
                href="/signin/doubleAuth"
                asChild
                onPress={() => {
                  router.dismissAll();
                }}
                dismissTo
              >
                <Text
                  style={{
                    color: Colors.background,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 8,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderColor: Colors.background,
                    borderWidth: 5,
                    borderRadius: 30,
                  }}
                >
                  Se connecter
                </Text>
              </Link>
              <View style={styles.googleContainer}>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Je me connecte avec Google
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
