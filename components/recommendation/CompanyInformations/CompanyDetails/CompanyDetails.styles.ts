import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.black,
  },
  input: {
    borderColor: Colors.violet,
    color: Colors.black,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.white,
    borderColor: Colors.violet,
    borderWidth: 4,
    color: Colors.black,
    borderRadius: 50,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
