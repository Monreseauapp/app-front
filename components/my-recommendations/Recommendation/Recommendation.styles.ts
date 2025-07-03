import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  accepted: {
    color: Colors.green,
  },
  rejected: {
    color: Colors.red,
  },
  nameContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontStyle: "italic",
  },
  description: {
    width: "90%",
    marginVertical: 12,
    textAlign: "center",
  },
  contactContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contactTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  contactText: {
    textAlign: "center",
  },
  stateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});

const webStyles = StyleSheet.create({
  container: {
    width: width >= 1024 ? "30%" : width >= 600 ? "45%" : "90%",
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: "center",
  },
});

export { styles, webStyles };
export default styles;
