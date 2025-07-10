import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.violet,
    marginTop: 50,
  },
  notifications: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: width >= 768 ? "row" : "column",
    flexWrap: "wrap",
    gap: width >= 768 ? 10 : 0,
  },
  notificationContainer: {
    width: width,
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
  title: {
    fontSize: width >= 768 ? 32 : 26,
    fontWeight: "bold",
    color: Colors.violet,
    marginTop: 20,
  },

  notificationContainer: {
    width: width >= 768 ? "30%" : "100%",
    alignSelf: "center",
    backgroundColor: Colors.violet,
    padding: 20,
    marginBottom: 1,
  },
});

export { styles, webStyles };
export default styles;
