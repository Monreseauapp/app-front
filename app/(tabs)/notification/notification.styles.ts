import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    marginTop: 140,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
  },
  notificationContainer: {
    flex: 1,
    width: "100%",
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

export default styles;
