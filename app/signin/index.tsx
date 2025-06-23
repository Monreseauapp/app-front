import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
                  type="password"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  introText: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    width: "100%",
  },
  connectionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 48,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  form: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: Colors.background,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
  },
  googleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 40,
    borderRadius: 30,
    backgroundColor: Colors.background,
  },
});
