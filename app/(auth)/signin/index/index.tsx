import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, webStyles } from "./index.styles";

export default function SignIn() {
  const { API_URL } = useContext(AppContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = () => {
    setError(false);
    const isConnected = axios
      .post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => response.data.authorized)
      .catch((error) => {
        console.error("Login failed:", error);
        setError(true);
        return false;
      });
    return isConnected;
  };

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
                value={email}
                onChangeText={(text) => setEmail(text)}
                valid={!error}
                validationMessage="Vérifiez votre email."
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
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  valid={!error}
                  validationMessage="Vérifiez votre mot de passe."
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
              <Pressable
                onPress={async () => {
                  if (await login()) {
                    router.dismissAll();
                    router.push({
                      pathname: "/(auth)/signin/doubleAuth",
                      params: { email },
                    });
                  }
                }}
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
              </Pressable>
              <View style={styles.googleContainer}>
                <Text
                  style={{
                    color: Colors.black,
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
