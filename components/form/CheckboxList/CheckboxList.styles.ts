import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 10,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 4,
  },
});

export default styles;
