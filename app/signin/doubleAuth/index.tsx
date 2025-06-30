import Input from "@/components/form/Input";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
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
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const CODE_LENGTH = 4;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback
      // onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
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
