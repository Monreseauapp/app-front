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
import { styles, webStyles } from "./index.styles";

export default function SignIn() {
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback
        onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
      >
        <View
          style={Platform.OS === "web" ? webStyles.container : styles.container}
        >
          {Platform.OS !== "web" && (
            <Text style={styles.introText}>Connectez-vous pour continuer.</Text>
          )}
          <Image
            source={require("@/assets/images/white-logo.png")}
            style={Platform.select({
              web: webStyles.logo,
              default: styles.logo,
            })}
          />
          <View style={Platform.OS === "web" ? webStyles.form : styles.form}>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.formContainer
                  : styles.formContainer
              }
            >
              <Text
                style={Platform.select({
                  web: webStyles.title,
                  default: styles.title,
                })}
              >
                Je me connecte.
              </Text>
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
                  style={Platform.select({
                    web: webStyles.passwordText,
                    default: styles.passwordText,
                  })}
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
                style={styles.connectionButton}
              >
                <Text
                  style={Platform.select({
                    web: webStyles.connectionText,
                    default: styles.connectionText,
                  })}
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
