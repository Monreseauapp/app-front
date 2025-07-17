import { Colors } from "@/constants/Colors";
import { Dimensions, Platform, Text, TextInput, View } from "react-native";
import { styles, webStyles } from "./Input.styles";

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
  value?: string;
  onChangeText?: (text: string) => void;
  valid?: boolean;
  validationMessage?: string;
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
  validationMessage,
  ...rest
}: InputProps & React.ComponentProps<typeof TextInput>) {
  const { width } = Dimensions.get("window");
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
  const { placeholderTextColor }: any = inputStyle || {};
  if (placeholderTextColor) {
    inputStyle = { ...inputStyle, placeholderTextColor };
  }
  return (
    <View style={{ width: `${100 / sameLine}%`, marginBottom: 20 }}>
      <Text
        style={[
          Platform.OS === "web" ? webStyles.title : styles.title,
          titleStyle,
        ]}
      >
        {name}{" "}
        {valid === false && !value && (
          <Text
            style={Platform.select({
              web: webStyles.required,
              default: styles.required,
            })}
          >
            {validationMessage || "(ce champ est requis)"}
          </Text>
        )}
      </Text>

      <TextInput
        autoComplete={type}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        multiline={multiline}
        onChange={(e) => {
          const text = e.nativeEvent.text;
          if (onChangeText) {
            if (keyboardType === "numeric" || keyboardType === "phone-pad") {
              onChangeText(text.replace(/[^0-9+-]/g, ""));
            } else {
              onChangeText(text);
            }
          }
        }}
        placeholderTextColor={placeholderTextColor || Colors.violet}
        placeholder={placeholder}
        ref={inputRef}
        secureTextEntry={type.includes("password")}
        style={Platform.select({
          web: {
            ...webStyles.input,
            width: sameLine > 1 ? "95%" : "100%",
            height: multiline ? 100 : width >= 600 ? 50 : 40,
            borderRadius: multiline ? 25 : 50,
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
    </View>
  );
}
