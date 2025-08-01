import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import axios from "axios";
import { RelativePathString } from "expo-router";
import { useRouter } from "expo-router/build/hooks";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, webStyles } from "./doubleAuth.styles";
export default function DoubleAuth() {
  const { API_URL, setToken, token, userId } = useContext(AppContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const CODE_LENGTH = 6;
  const login = () => {
    setError(false);
    const tempToken = localStorage.getItem("temp_token");
    const isConnected = axios
      .post(`${API_URL}/auth/2fa`, { email, passcode: code, tempToken })
      .then((response) => {
        const token = response.data.access_token;
        const expires = response.data.expires_in;
        if (token) {
          setToken && setToken(token, expires);
          localStorage.removeItem("temp_token");
          localStorage.removeItem("expires_in");
        }
        return true;
      })
      .catch((error) => {
        console.error("2FA login failed:", error);
        setError(true);
        return false;
      });
    return isConnected;
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const tempToken = localStorage.getItem("temp_token");
    const expiresIn = localStorage.getItem("expires_in");
    if (!tempToken || Date.now() > parseInt(expiresIn || "0")) {
      localStorage.removeItem("temp_token");
      localStorage.removeItem("expires_in");
      router.replace("/signin" as RelativePathString);
      return;
    }
    axios
      .post(`${API_URL}/auth/verify-temp-token`, { token: tempToken })
      .then((response) => {
        setEmail(response.data.email);
        if (!response.data.authorized) {
          localStorage.removeItem("temp_token");
          localStorage.removeItem("expires_in");
          router.replace("/signin" as RelativePathString);
        }
      })
      .catch((error) => {
        console.error("2FA login with temp token failed:", error);
        localStorage.removeItem("temp_token");
        localStorage.removeItem("expires_in");
        router.replace("/signin" as RelativePathString);
      });
  }, [API_URL, mounted, router]);
  useEffect(() => {
    if (mounted && token && userId) {
      router.replace("/(tabs)/home" as unknown as RelativePathString);
    }
  }, [mounted, token, userId, router]);
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
              Vérification de votre compte
            </Text>
            <Text
              style={Platform.select({
                web: webStyles.subtitle,
                default: styles.subtitle,
              })}
            >
              Merci de bien vouloir rentrer le code à {CODE_LENGTH} chiffres.
            </Text>
            <Pressable onPress={() => inputRef.current?.focus()}>
              <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
                {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                  <View
                    key={i}
                    style={Platform.select({
                      web: webStyles.numberSquare,
                      default: styles.numberSquare,
                    })}
                  >
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      {code[i] || ""}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
            <Input
              name=""
              type="one-time-code"
              placeholder=""
              inputStyle={{
                position: "absolute",
                opacity: 0,
                width: 1,
                height: 1,
              }}
              autoFocus={true}
              inputRef={inputRef}
              value={code}
              onChangeText={(text) =>
                setCode(text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))
              }
            />
            <Text style={styles.error}>
              {error && "Le code n'est pas valide."}
            </Text>
            <Pressable onPress={login} style={styles.validationButton}>
              <Text style={styles.buttonText}>Valider</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
