import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: Colors.background,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputsContainer: {
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
    // marginBottom: 70,
  },
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
