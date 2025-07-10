import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  basicText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    backgroundColor: Colors.violet,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
  },
});

export default styles;
