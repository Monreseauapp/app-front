import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    marginTop: 140,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.violet,
  },
  notificationContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
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
    backgroundColor: Colors.violet,
    padding: 20,
    marginBottom: 1,
  },
  notificationText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

const webStyles = StyleSheet.create({
  notification: {
    width: width >= 768 ? "30%" : "100%",
    backgroundColor: Colors.violet,
    padding: 20,
    marginBottom: 1,
  },
});

export { styles, webStyles };
export default styles;
