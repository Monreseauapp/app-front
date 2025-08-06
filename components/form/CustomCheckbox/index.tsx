import CheckMark from "@/assets/icons/checkmark.svg";
import { Colors } from "@/constants/Colors";
import { Dimensions, Platform, Pressable, View } from "react-native";

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
  const { width: screenWidth } = Dimensions.get("window");
  return (
    <Pressable onPress={() => onChange(!checked)} testID="custom-checkbox">
      <View
        style={{
          width:
            width / (Platform.OS === "web" && screenWidth < 600 ? 1.25 : 1),
          height:
            height / (Platform.OS === "web" && screenWidth < 600 ? 1.25 : 1),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: checked ? Colors.white : Colors.violet,
          ...style,
        }}
      >
        {checked && (
          <CheckMark
            width={
              width / (Platform.OS === "web" && screenWidth < 600 ? 2 : 1.5)
            }
            height={
              height / (Platform.OS === "web" && screenWidth < 600 ? 2 : 1.5)
            }
            color={markerStyle || Colors.violet}
            testID="custom-checkbox-checkmark"
          />
        )}
      </View>
    </Pressable>
  );
}
