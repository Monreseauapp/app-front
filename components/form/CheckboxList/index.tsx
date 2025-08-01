import { Colors } from "@/constants/Colors";
import { useState } from "react";

import { Platform, Text, View } from "react-native";
import CustomCheckbox from "../CustomCheckbox";
import { styles, webStyles } from "./CheckboxList.styles";

interface InputProps<T> {
  title: string;
  choices: React.ReactNode[];
  data: T;
  field: keyof T;
  onChange?: (value: string) => void;
}

export default function CheckboxList<T>({
  title,
  choices,
  data,
  field,
  onChange,
}: InputProps<T>) {
  const [checked, setChecked] = useState<boolean[]>(
    Array(choices.length).fill(false)
  );

  return (
    <View style={{ width: `100%`, marginBottom: 20 }}>
      <Text
        style={Platform.select({
          web: webStyles.title,
          default: styles.title,
        })}
      >
        {title}
      </Text>
      {choices.map((choice, index) => (
        <View style={styles.section} key={index}>
          <CustomCheckbox
            style={styles.checkbox}
            markerStyle={Colors.white}
            width={25}
            height={25}
            checked={checked[index]}
            onChange={(value) => {
              const newChecked = [...checked];
              newChecked[index] = value;
              setChecked(newChecked);
              onChange &&
                onChange(
                  (data[field] ? data[field] + ";" : "") +
                    (typeof choice === "object" && choice && "key" in choice
                      ? choice.key
                      : "")
                );
            }}
          />
          {choice}
        </View>
      ))}
    </View>
  );
}
