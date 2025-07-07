import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.background,
    borderColor: Colors.accent,
    borderWidth: 4,
    color: Colors.text,
    borderRadius: 50,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
