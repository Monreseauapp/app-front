import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  checkbox: {
    backgroundColor: Colors.violet,
  },
  inputTitle: {
    color: Colors.black,
  },
  input: {
    borderColor: Colors.violet,
    color: Colors.black,
    borderWidth: 4,
  },
});

export { styles };
export default styles;
