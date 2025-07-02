import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    width: "90%",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
  backIcon: {
    position: "absolute",
    top: 55,
    left: 30,
    zIndex: 10,
    padding: 20,
  },
});

const webStyles = StyleSheet.create({
  title: {
    width: "90%",
    fontSize: width >= 768 ? 26 : 22,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: width >= 768 ? 16 : 12,
    paddingHorizontal: width >= 768 ? 32 : 24,
    borderRadius: 100,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonText: {
    fontSize: width >= 768 ? 20 : 18,
    color: Colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { styles, webStyles };
export default styles;
