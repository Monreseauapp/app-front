import Input from "@/components/form/Input";
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
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, webStyles } from "./index.styles";
export default function SignIn() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]{8,}$/;
  const { API_URL } = useContext(AppContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const login = () => {
    setError("");
    const isConnected = axios
      .post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("temp_token", response.data.temp_token);
        localStorage.setItem(
          "expires_in",
          String(Date.now() + parseInt(String(response.data.expires_in)) * 1000)
        );
        return true;
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Vérifiez votre email et mot de passe.");
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
        <ScrollView
          style={Platform.OS === "web" ? webStyles.container : styles.container}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: Platform.OS === "web" ? "center" : "space-between",
          }}
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
                placeholder=""
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                isDataCorrect={emailRegex.test(email)}
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
                  placeholder=""
                  type="current-password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  isDataCorrect={passwordRegex.test(password)}
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
              {error && <Text style={styles.error}>{error}</Text>}
              <Pressable
                onPress={async () => {
                  if (await login()) {
                    router.dismissAll();
                    router.push({
                      pathname: "/(auth)/signin/doubleAuth",
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
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
