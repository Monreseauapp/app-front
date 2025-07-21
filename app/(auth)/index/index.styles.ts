import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  subTitle: {
    fontSize: 20,
  },
  logo: {
    position: "absolute",
    top: 100,
    width: 320,
    height: 100,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.violet,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    padding: 6,
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  connectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.violet,
    textDecorationLine: "underline",
  },
});

const webStyles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: width >= 1024 ? 50 : 40,
  },
  subTitle: {
    fontSize: width >= 1024 ? 30 : 20,
  },
  logo: {
    position: "absolute",
    top: 50,
    width: width >= 1024 ? 480 : 320,
    height: width >= 1024 ? 150 : 100,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: width >= 768 ? "row" : "column",
    justifyContent: "center",
    alignItems: "baseline",
    gap: width >= 768 ? 50 : 0,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    width: width >= 600 ? 300 : 250,
    backgroundColor: Colors.violet,
    padding: 10,
    borderRadius: 25,
    marginTop: width >= 600 ? 30 : 10,
  },
  buttonText: {
    fontSize: width >= 600 ? 22 : 18,
    padding: 6,
    color: Colors.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  connectionText: {
    fontSize: width >= 600 ? 20 : 18,
    fontWeight: "bold",
    color: Colors.violet,
    textDecorationLine: "underline",
  },
});

export { styles, webStyles };
export default styles;
