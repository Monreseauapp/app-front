import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  logo: {
    width: 320,
    height: 100,
    marginBottom: 0,
    position: "absolute",
    top: 60,
  },
  container: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.violet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    textAlign: "center",
  },
  noticeContainer: {
    width: "90%",
    height: "20%",
    borderWidth: 2,
    borderRadius: 25,
    padding: 15,
    borderColor: Colors.white,
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "left",
  },
  checkbox: {
    margin: 10,
    backgroundColor: Colors.violet,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
  },
  checkboxText: {
    fontSize: 16,
    color: Colors.white,
  },
  validationButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.violet,
    fontWeight: "bold",
    fontSize: 20,
  },
});

const webStyles = StyleSheet.create({
  container: {
    width: width >= 600 ? "50%" : "90%",
    height: width >= 600 ? "70%" : "80%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.violet,
    borderRadius: 30,
  },
  logo: {
    width: width >= 600 ? 320 : 240,
    height: width >= 600 ? 100 : 75,
    marginBottom: 20,
  },
});

export { styles, webStyles };
export default styles;
