import { Colors } from "@/constants/Colors";
import { Text, TextInput, View } from "react-native";

type InputProps = {
  name: string;
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
    | "organization" // IOS
    | "password" // Android && Global
    | "postal-code" // Global
    | "tel" // Global
    | "tel-national" // Android
    | "url"; // IOS
  offType?: "date";
  sameLine?: number;
};

export default function Input({
  name,
  placeholder,
  type,
  offType,
  sameLine = 1,
}: InputProps) {
  let keyboardType: "default" | "email-address" | "numeric" | "phone-pad" =
    "default";
  if (type === "email") {
    keyboardType = "email-address";
  } else if (type === "tel" || type === "tel-national") {
    keyboardType = "phone-pad";
  } else if (type === "postal-code" || offType === "date") {
    keyboardType = "numeric";
  }
  return (
    <View style={{ width: `${100 / sameLine}%`, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 10,
          paddingLeft: 16,
          color: Colors.background,
        }}
      >
        {name}
      </Text>
      <TextInput
        autoComplete={type}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.accent}
        style={{
          width: sameLine > 1 ? "90%" : "100%",
          height: 50,
          backgroundColor: Colors.background,
          color: Colors.accent,
          borderRadius: 50,
          paddingHorizontal: 20,
          fontSize: 16,
          fontWeight: "bold",
        }}
        placeholder={placeholder}
        secureTextEntry={type === "password"}
      />
    </View>
  );
}
