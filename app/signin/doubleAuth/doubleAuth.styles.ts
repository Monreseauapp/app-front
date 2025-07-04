import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.accent,
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
    color: Colors.background,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 10,
    textAlign: "center",
  },
  numberSquare: {
    width: 55,
    height: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  resend: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -40,
    textDecorationLine: "underline",
    marginBottom: 40,
  },
  validationButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default styles;
