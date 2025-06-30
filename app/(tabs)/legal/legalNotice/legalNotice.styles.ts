import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

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
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 10,
    textAlign: "center",
  },
  noticeContainer: {
    width: "90%",
    height: "20%",
    borderWidth: 2,
    borderRadius: 25,
    padding: 15,
    borderColor: Colors.background,
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 16,
    color: Colors.background,
    textAlign: "left",
  },
  checkbox: {
    margin: 10,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 4,
  },
  checkboxText: {
    fontSize: 16,
    color: Colors.background,
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
    fontSize: 20,
  },
});

export default styles;
