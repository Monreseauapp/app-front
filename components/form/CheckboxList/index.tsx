import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Text, View } from "react-native";
import CustomCheckbox from "../CustomCheckbox";
import styles from "./CheckboxList.styles";

interface InputProps {
  title: string;
  choices: React.ReactNode[];
}

export default function CheckBoxList({ title, choices }: InputProps) {
  const [checked, setChecked] = useState<boolean[]>(
    Array(choices.length).fill(false)
  );

  return (
    <View style={{ width: `100%`, marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "bold",
          paddingLeft: 16,
          color: Colors.background,
        }}
      >
        {title}
      </Text>
      {choices.map((choice, index) => (
        <View style={styles.section} key={index}>
          <CustomCheckbox
            style={styles.checkbox}
            width={25}
            height={25}
            checked={checked[index]}
            onChange={(value) => {
              const newChecked = [...checked];
              newChecked[index] = value;
              setChecked(newChecked);
            }}
          />
          {choice}
        </View>
      ))}
    </View>
  );
}
