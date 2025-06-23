import { Colors } from "@/constants/Colors";
import { Text, TextInput, View } from "react-native";

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
    | "email" // Global
    | "family-name" // Global
    | "given-name" // Global
    | "name-family" // Android
    | "name-given" // Android
    | "off" // Global
    | "one-time-code" // Global
    | "organization" // IOS
    | "password" // Android && Global
    | "postal-code" // Global
    | "tel" // Global
    | "tel-national" // Android
    | "url"; // IOS
  offType?: "date";
  sameLine?: number;
  multiline?: boolean;
  titleStyle?: object;
  inputStyle?: object;
  autoFocus?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  value?: string;
  onChangeText?: (text: string) => void;
  valid?: boolean;
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
  value,
  onChangeText,
  valid = undefined,
}: InputProps) {
  let keyboardType: "default" | "email-address" | "numeric" | "phone-pad" =
    "default";
  if (type === "email") {
    keyboardType = "email-address";
  } else if (type === "tel" || type === "tel-national") {
    keyboardType = "phone-pad";
  } else if (
    type === "postal-code" ||
    type === "one-time-code" ||
    offType === "date"
  ) {
    keyboardType = "numeric";
  }
  const { placeholderTextColor }: any = inputStyle || {};
  if (placeholderTextColor) {
    inputStyle = { ...inputStyle, placeholderTextColor };
  }
  return (
    <View style={{ width: `${100 / sameLine}%`, marginBottom: 20 }}>
      <Text
        style={{
          width: "95%",
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 10,
          paddingLeft: 16,
          color: Colors.background,
          ...titleStyle,
        }}
      >
        {name}{" "}
        {valid === false && !value && (
          <Text
            style={{
              color: Colors.red,
              paddingLeft: 16,
              fontSize: 14,
              fontWeight: "bold",
              marginTop: -5,
            }}
          >
            (ce champ est requis)
          </Text>
        )}
      </Text>

      <TextInput
        autoComplete={type}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        multiline={multiline}
        onChange={(e) => {
          if (onChangeText) {
            onChangeText(e.nativeEvent.text);
          }
        }}
        placeholderTextColor={placeholderTextColor || Colors.accent}
        placeholder={placeholder}
        ref={inputRef}
        secureTextEntry={type === "password"}
        style={{
          width: sameLine > 1 ? "95%" : "100%",
          height: multiline ? 100 : 50,
          backgroundColor: Colors.background,
          color: Colors.accent,
          borderRadius: multiline ? 25 : 50,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          fontWeight: "bold",
          ...inputStyle,
        }}
        value={value}
      />
    </View>
  );
}
