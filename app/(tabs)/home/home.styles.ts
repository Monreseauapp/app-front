import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.accent,
    marginTop: 50,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default styles;
