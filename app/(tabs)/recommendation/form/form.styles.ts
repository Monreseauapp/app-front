import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  title: {
    width: "90%",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
  },
  backIcon: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    padding: 20,
  },
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.background,
    color: Colors.text,
  },
  validationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default styles;
