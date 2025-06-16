import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Text, View } from "react-native";

interface InputProps {
  title: string;
  choices: string[];
}

export default function Select({ title, choices }: InputProps) {
  const [selectedValue, setSelectedValue] = useState(choices[0]);

  return (
    <View style={{ width: `100%`, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingLeft: 16,
          color: Colors.background,
        }}
      >
        {title}
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={{
          height: 200,
          width: "100%",
          backgroundColor: Colors.accent,
        }}
      >
        {choices.map((choice, index) => (
          <Picker.Item
            key={index}
            label={choice}
            value={choice}
            color={Colors.background}
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
