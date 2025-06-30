import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  basicText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 4,
  },
});

export default styles;
