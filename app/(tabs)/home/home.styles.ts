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
    top: 70,
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
    top: 30,
    left: width >= 768 ? 110 : 30,
    zIndex: 10,
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: width >= 1024 ? 40 : 0,
  },
});

export { styles, webStyles };
export default styles;
