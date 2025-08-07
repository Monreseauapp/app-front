import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import Input from "@/components/form/Input";
import { webStyles, styles } from "./resetPassword.styles";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { AppContext } from "@/context/context";

export default function ResetPassword() {
  const { token } = useLocalSearchParams();
  const { API_URL } = useContext(AppContext);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]{8,}$/;

  const resetPassword = () => {
    axios
      .post(`${API_URL}/auth/reset-password`, {
        token,
        password,
        confirmPassword,
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
        setError(
          "Échec de la réinitialisation du mot de passe. Veuillez réessayer.",
        );
      });
    if (!error) {
      router.replace("/signin" as RelativePathString);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!token && mounted) {
    router.replace("/signin" as RelativePathString);
  }
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
          style={
            Platform.OS === "web"
              ? webStyles.pageContainer
              : styles.pageContainer
          }
        >
          <Image
            source={require("@/assets/images/white-logo.png")}
            style={Platform.select({
              web: webStyles.logo,
              default: styles.logo,
            })}
          />
          <View
            style={
              Platform.OS === "web" ? webStyles.container : styles.container
            }
          >
            <Text
              style={Platform.select({
                web: webStyles.title,
                default: styles.title,
              })}
            >
              Rénitalisation de votre mot de passe
            </Text>
            <Input
              name="Nouveau mot de passe"
              type="new-password"
              placeholder=""
              value={password}
              onChangeText={setPassword}
              isDataCorrect={passwordRegex.test(password)}
              incorrectMessage="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
            />
            <Input
              name="Confirmer le mot de passe"
              type="new-password"
              placeholder=""
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            {password &&
              confirmPassword &&
              password !== confirmPassword &&
              !error && (
                <Text style={styles.error}>
                  Les mots de passe ne correspondent pas.
                </Text>
              )}
            <Pressable
              onPress={() => {
                if (
                  password &&
                  confirmPassword &&
                  password === confirmPassword &&
                  passwordRegex.test(password)
                ) {
                  resetPassword();
                } else {
                  setError("Les mots de passe ne correspondent pas.");
                }
              }}
              style={styles.validationButton}
            >
              <Text style={styles.buttonText}>Valider</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
