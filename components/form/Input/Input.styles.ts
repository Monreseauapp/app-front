import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    width: "95%",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingLeft: 16,
    color: Colors.background,
  },
  required: {
    color: Colors.red,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -5,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: Colors.background,
    color: Colors.accent,
  },
});

const webStyles = StyleSheet.create({
  title: {
    width: "95%",
    fontSize: width >= 768 ? 22 : 18,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingLeft: 16,
    color: Colors.background,
  },
  required: {
    color: Colors.red,
    paddingLeft: 16,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -5,
  },
  input: {
    width: "100%",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: Colors.background,
    color: Colors.accent,
  },
});

export { styles, webStyles };
export default styles;
