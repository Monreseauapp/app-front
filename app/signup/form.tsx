import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function FormSignUp() {
  const { type } = useLocalSearchParams<{ type: "company" | "guest" }>();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {type === "company" && (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant pour accéder au{" "}
              <Text style={styles.span}>questionnaire</Text> et valider la{" "}
              <Text style={styles.span}>première étape</Text> de votre
              inscription.
            </Text>
          )}
          {type === "guest" && (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant et vivez l'expérience{" "}
              <Text style={{ ...styles.span, color: Colors.accent }}>
                Mon Réseau
              </Text>{" "}
              dès maintenant.
            </Text>
          )}
          <View style={styles.formContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...styles.title, width: "50%" }}>
                Créez votre compte.
              </Text>
              <Text style={{ ...styles.title, width: "50%" }}>HIBOUUUUUU</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Input
                name="Prénom"
                placeholder="Margot"
                type={Platform.OS === "android" ? "name-family" : "family-name"}
                sameLine={2}
              />
              <Input
                name="Nom"
                placeholder="Caron"
                type={Platform.OS === "android" ? "name-given" : "given-name"}
                sameLine={2}
              />
            </View>
            <Input name="Email" placeholder="exemple@gmail.com" type="email" />
            <Input name="Mot de passe" placeholder="********" type="password" />
            <Pressable>
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
                  borderRadius: 50,
                }}
              >
                Suivant
              </Text>
            </Pressable>
            <Link dismissTo href="/signin">
              <Text
                style={{
                  color: Colors.background,
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Vous avez déjà un compte ?
              </Text>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 50,
    width: "70%",
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: Colors.background,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
