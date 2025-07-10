import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "column",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.violet,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputsContainer: {
    flex: 1,
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
  },
  inputTitle: {
    color: Colors.black,
  },
  input: {
    height: 50,
    borderColor: Colors.violet,
    color: Colors.black,
    borderWidth: 4,
  },
  checkBox: {
    alignSelf: "center",
    backgroundColor: Colors.violet,
    marginBottom: 20,
  },
  checkBoxTitle: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.violet,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

const webStyles = StyleSheet.create({
  inputsContainer: {
    width: width >= 768 ? "50%" : "90%",
    flexDirection: "column",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.violet,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export { styles, webStyles };
export default styles;
