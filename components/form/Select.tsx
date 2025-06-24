import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

interface InputProps {
  title: string;
  choices: string[];
  titleStyle?: object;
  selectStyle?: object;
  selected?: string;
  setSelected?: (value: string) => void;
  valid?: boolean | undefined;
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
          color: Colors.background,
          ...titleStyle,
        }}
      >
        {title}{" "}
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
          height: 200,
          width: "100%",
          backgroundColor: Colors.accent,
          ...selectStyle,
        }}
      >
        {choices.map((choice, index) => (
          <Picker.Item
            key={index}
            label={choice}
            value={choice}
            color={pickerTextColor || Colors.background}
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          />
        ))}
      </Picker>
    </View>
  );
}
