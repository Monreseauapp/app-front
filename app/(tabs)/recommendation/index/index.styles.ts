import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    width: "90%",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
    marginVertical: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.violet,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const webStyles = StyleSheet.create({
  title: {
    width: "90%",
    fontSize: width >= 768 ? 26 : 22,
    fontWeight: "bold",
    color: Colors.black,
    marginVertical: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.violet,
    paddingVertical: width >= 768 ? 16 : 12,
    paddingHorizontal: width >= 768 ? 32 : 24,
    borderRadius: 100,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonText: {
    fontSize: width >= 768 ? 20 : 18,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { styles, webStyles };
export default styles;
