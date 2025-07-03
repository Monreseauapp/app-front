import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.text,
  },
  input: {
    height: 50,
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.background,
    borderColor: Colors.accent,
    borderWidth: 4,
    borderRadius: 50,
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
