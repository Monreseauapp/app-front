import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width >= 768 ? "60%" : "90%",
    alignSelf: "center",
    marginTop: width >= 600 ? 200 : 100,
    padding: 20,
  },
  logo: {
    position: "absolute",
    top: 100,
    width: 320,
    height: 100,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.violet,
    width: width >= 768 ? "40%" : "60%",
    alignSelf: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
});

const webStyles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 50,
    width: width >= 1024 ? 480 : 320,
    height: width >= 1024 ? 150 : 100,
    marginBottom: 20,
  },
});

export { styles, webStyles };
export default styles;
