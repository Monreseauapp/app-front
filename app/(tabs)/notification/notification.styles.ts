import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    marginTop: 140,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
  },
  notificationContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
    marginLeft: 20,
  },
  notifications: {
    width: "100%",
    flexDirection: width >= 768 ? "row" : "column",
    flexWrap: "wrap",
    gap: width >= 768 ? 10 : 0,
  },
  notification: {
    width: "100%",
    backgroundColor: Colors.accent,
    padding: 20,
    marginBottom: 1,
  },
  notificationText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});

const webStyles = StyleSheet.create({
  notification: {
    width: width >= 768 ? undefined : "100%",
    minWidth: "30%",
    maxWidth: width >= 768 ? "45%" : "100%",
    backgroundColor: Colors.accent,
    padding: 20,
    marginBottom: 1,
  },
});

export { styles, webStyles };
export default styles;
