import CheckMark from "@/assets/icons/checkmark.svg";
import { Colors } from "@/constants/Colors";
import { Pressable, View } from "react-native";

export default function CustomCheckbox({
  checked,
  onChange,
  style = {},
  markerStyle = "",
  width = 20,
  height = 20,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: object;
  markerStyle?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Pressable onPress={() => onChange(!checked)}>
      <View
        style={{
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: checked ? Colors.background : Colors.accent,
          ...style,
        }}
      >
        {checked && (
          <CheckMark
            width={width / 1.5}
            height={height / 1.5}
            color={markerStyle || Colors.accent}
          />
        )}
      </View>
    </Pressable>
  );
}
