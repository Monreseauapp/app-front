import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 100,
    width: 320,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    padding: 6,
    color: Colors.background,
    fontWeight: "bold",
  },
});

export default styles;
