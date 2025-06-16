import CheckMark from "@/assets/icons/checkmark.svg";
import { Colors } from "@/constants/Colors";
import { Pressable, View } from "react-native";

export default function CustomCheckbox({
  checked,
  onChange,
  style = {},
  width = 20,
  height = 20,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: object;
  width?: number;
  height?: number;
}) {
  return (
    <Pressable onPress={() => onChange(!checked)}>
      <View
        style={{
          ...style,
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: checked ? Colors.background : Colors.accent,
        }}
      >
        {checked && (
          <CheckMark
            width={width / 1.5}
            height={height / 1.5}
            color={Colors.accent}
          />
        )}
      </View>
    </Pressable>
  );
}
