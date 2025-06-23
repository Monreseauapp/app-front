import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function DoubleAuth() {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const CODE_LENGTH = 4;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: Colors.background,
          }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Vérification de votre compte</Text>
            <Text style={styles.subtitle}>
              Merci de bien vouloir rentrer le code à 4 chiffres.
            </Text>
            <Pressable onPress={() => inputRef.current?.focus()}>
              <View style={{ flexDirection: "row", gap: 16, marginTop: 24 }}>
                {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                  <View key={i} style={styles.numberSquare}>
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
            <Pressable>
              <Text style={styles.resend}>Renvoyer le code</Text>
            </Pressable>
            <Link href="/home" style={styles.validationButton} dismissTo>
              <Text style={styles.buttonText}>Valider</Text>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    width: "80%",
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.background,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 10,
    textAlign: "center",
  },
  numberSquare: {
    width: 55,
    height: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  resend: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -40,
    textDecorationLine: "underline",
    marginBottom: 40,
  },
  validationButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 25,
  },
});
