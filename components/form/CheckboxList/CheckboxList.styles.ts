import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    paddingLeft: 16,
    color: Colors.white,
  },
  checkbox: {
    margin: 10,
    backgroundColor: Colors.violet,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
  },
});

const webStyles = StyleSheet.create({
  title: {
    fontSize: width >= 600 ? 20 : 16,
    marginBottom: 10,
    fontWeight: "bold",
    paddingLeft: 16,
    color: Colors.white,
  },
});

export { styles, webStyles };
export default styles;
