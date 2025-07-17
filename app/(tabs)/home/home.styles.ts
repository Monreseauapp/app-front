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
  notification: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.violet,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: width >= 600 ? 0 : 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

const webStyles = StyleSheet.create({
  title: {
    fontSize: width >= 768 ? 32 : 26,
    fontWeight: "bold",
    color: Colors.violet,
    marginTop: 20,
  },
  notification: {
    position: "absolute",
    top: 10,
    left: width >= 768 ? 110 : 30,
    zIndex: 10,
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
