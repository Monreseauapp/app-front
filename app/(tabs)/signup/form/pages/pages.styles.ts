import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  formPage: {
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: Colors.white,
    borderWidth: 5,
    borderRadius: 50,
    textAlign: "center",
  },
  span: {
    fontWeight: "bold",
  },
  checkboxText: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 8,
  },
  validationButton: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
  },
  validationText: {
    color: Colors.violet,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const webStyles = StyleSheet.create({
  formPage: {
    width: "100%",
    paddingHorizontal: width >= 768 ? 32 : 16,
    paddingVertical: width >= 768 ? 48 : 24,
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: width >= 600 ? 25 : 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkboxText: {
    color: Colors.white,
    fontSize: width >= 600 ? 18 : 16,
    marginLeft: 8,
  },
});

export { styles, webStyles };
export default styles;
