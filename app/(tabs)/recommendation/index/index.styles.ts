import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    width: "90%",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
  backIcon: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    padding: 20,
  },
});

export default styles;
