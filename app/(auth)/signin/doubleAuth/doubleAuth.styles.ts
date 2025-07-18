import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.white,
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.violet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    width: 320,
    height: 100,
    marginBottom: 20,
    position: "absolute",
    top: 60,
  },
  title: {
    width: "80%",
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    textAlign: "center",
  },
  numberSquare: {
    width: 55,
    height: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
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
    fontSize: 25,
  },
  error: {
    color: Colors.red,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
});

const webStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  container: {
    width: width >= 600 ? "50%" : "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.violet,
    borderRadius: 30,
  },
  logo: {
    width: width >= 1024 ? 480 : 320,
    height: width >= 1024 ? 150 : 100,
    marginBottom: 20,
  },
  title: {
    width: "80%",
    fontSize: width >= 768 ? 36 : 30,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    width: "80%",
    fontSize: width >= 768 ? 24 : 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    textAlign: "center",
  },
  numberSquare: {
    width: 55,
    height: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  resend: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -40,
    textDecorationLine: "underline",
    marginBottom: 40,
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
    fontSize: 25,
  },
});

export { styles, webStyles };
export default styles;
