import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formPage: {
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: "center",
  },
  title: {
    color: Colors.background,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: Colors.background,
    borderWidth: 5,
    borderRadius: 50,
    textAlign: "center",
  },
  span: {
    fontWeight: "bold",
  },
  checkboxText: {
    color: Colors.background,
    fontSize: 18,
    marginLeft: 8,
  },
  validationButton: {
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
  },
  validationText: {
    color: Colors.accent,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
