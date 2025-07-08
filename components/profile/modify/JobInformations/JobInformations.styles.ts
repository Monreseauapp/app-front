import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.black,
  },
  input: {
    height: 50,
    borderColor: Colors.violet,
    color: Colors.black,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.white,
    borderColor: Colors.violet,
    borderWidth: 4,
    borderRadius: 50,
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
