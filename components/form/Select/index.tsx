import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { Platform, Text, View } from "react-native";
import { styles, webStyles } from "./Select.styles";

interface InputProps {
  title: string;
  choices: string[];
  titleStyle?: object;
  selectStyle?: object;
  selected?: string;
  setSelected?: (value: string) => void;
  valid?: boolean | null;
}

export default function Select({
  title,
  choices,
  titleStyle,
  selectStyle,
  selected,
  setSelected,
  valid = undefined,
}: InputProps) {
  const { pickerTextColor }: any = selectStyle || {};
  if (pickerTextColor) {
    selectStyle = { ...selectStyle, pickerTextColor };
  }

  return (
    <View style={{ width: `100%`, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingLeft: 16,
          color: Colors.white,
          ...titleStyle,
        }}
      >
        {title}{" "}
        {valid !== undefined && <Text style={{ color: Colors.red }}>*</Text>}
        {valid === false && !selected && (
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
      <Picker
        selectedValue={selected}
        onValueChange={setSelected}
        style={{
          ...Platform.select({ web: webStyles.picker, default: styles.picker }),
          ...selectStyle,
        }}
        testID="select-picker"
      >
        {["Sélectionnez une proposition...", ...choices].map(
          (choice, index) => (
            <Picker.Item
              key={index}
              label={choice}
              value={choice}
              color={pickerTextColor || Colors.white}
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          )
        )}
      </Picker>
    </View>
  );
}
