import { Colors } from "@/constants/Colors";
import { useState } from "react";

import {
  Dimensions,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles, webStyles } from "./Input.styles";
import { useTogglePasswordVisibility } from "@/hooks/useTogglePasswordVisibility ";
import Eye from "@/assets/icons/eye.svg";
import EyeOff from "@/assets/icons/eye-slash.svg";

type InputProps = {
  name?: string;
  placeholder: string;
  type:
    | "address-line1" // Global
    | "address-line2" // Global
    | "cc-csc" // Global (IOS 17+)
    | "cc-exp-month" // Global (IOS 17+)
    | "cc-exp-year" // Global (IOS 17+)
    | "cc-family-name" // IOS
    | "cc-given-name" // IOS
    | "cc-number" // Global
    | "cc-type" // Global (IOS 17+)
    | "country" // Global
    | "current-password" // Global
    | "email" // Global
    | "family-name" // Global
    | "given-name" // Global
    | "name-family" // Android
    | "name-given" // Android
    | "new-password" // Global
    | "off" // Global
    | "one-time-code" // Global
    | "organization" // IOS
    | "password" // Android
    | "postal-code" // Global
    | "tel" // Global
    | "tel-national" // Android
    | "url"; // IOS
  offType?: "date" | "number";
  sameLine?: number;
  multiline?: boolean;
  titleStyle?: object;
  inputStyle?: object;
  autoFocus?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  limit?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  valid?: boolean | null;
  validationMessage?: string;
  isDataCorrect?: boolean;
  incorrectMessage?: string;
};

export default function Input({
  name,
  placeholder,
  type,
  offType,
  sameLine = 1,
  multiline = false,
  titleStyle = {},
  inputStyle = {},
  autoFocus = false,
  inputRef,
  limit,
  value,
  onChangeText,
  valid = undefined,
  validationMessage,
  isDataCorrect = true,
  incorrectMessage,
  ...rest
}: InputProps & React.ComponentProps<typeof TextInput>) {
  const { width } = Dimensions.get("window");
  const { passwordVisibility, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isFocused, setIsFocused] = useState(false);
  let keyboardType: "default" | "email-address" | "numeric" | "phone-pad" =
    "default";
  if (type === "email") {
    keyboardType = "email-address";
  } else if (type === "tel" || type === "tel-national") {
    keyboardType = "phone-pad";
  } else if (
    type === "postal-code" ||
    type === "one-time-code" ||
    offType === "date" ||
    offType === "number"
  ) {
    keyboardType = "numeric";
  }
  return (
    <View
      style={{
        width: `${100 / sameLine}%`,
        marginBottom: 20,
        position: "relative",
      }}
    >
      <Text
        style={[
          Platform.OS === "web" ? webStyles.title : styles.title,
          titleStyle,
        ]}
      >
        {name}{" "}
        {valid !== undefined ? (
          <Text style={{ color: Colors.red }}>*</Text>
        ) : null}
        {valid === false && !value ? (
          <Text
            style={Platform.select({
              web: webStyles.required,
              default: styles.required,
            })}
          >
            {validationMessage || "(ce champ est requis)"}
          </Text>
        ) : null}
        {isDataCorrect === false ? (
          <Text
            style={Platform.select({
              web: webStyles.required,
              default: styles.required,
            })}
          >
            {incorrectMessage || "(ce champ est incorrect)"}
          </Text>
        ) : null}
        {valid !== false && isDataCorrect !== false && (limit || multiline) && (
          <Text style={styles.limit}>
            {value ? `${value.length}/${limit || 255}` : `0/${limit || 255}`}
          </Text>
        )}
      </Text>
      <TextInput
        autoComplete={type}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={(text) => {
          const newText = text.slice(0, limit || 255);
          if (onChangeText) {
            if (keyboardType === "numeric" || keyboardType === "phone-pad") {
              onChangeText(newText.replace(/[^0-9+-]/g, ""));
            } else {
              onChangeText(newText);
            }
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={Colors.grey}
        placeholder={placeholder}
        ref={inputRef}
        secureTextEntry={type.includes("password") && passwordVisibility}
        style={Platform.select({
          web: {
            ...webStyles.input,
            width: sameLine > 1 ? "95%" : "100%",
            height: multiline ? 100 : width >= 600 ? 50 : 40,
            borderRadius: multiline ? 25 : 50,
            outline: isFocused && "auto",
            ...inputStyle,
          },
          default: {
            ...styles.input,
            width: sameLine > 1 ? "95%" : "100%",
            height: multiline ? 100 : 50,
            borderRadius: multiline ? 25 : 50,
            ...inputStyle,
          },
        })}
        value={value}
        {...rest}
      />
      {["password", "new-password", "current-password"].includes(type) && (
        <Pressable onPress={handlePasswordVisibility}>
          {passwordVisibility ? (
            <EyeOff style={styles.eye} />
          ) : (
            <Eye style={styles.eye} />
          )}
        </Pressable>
      )}
    </View>
  );
}
