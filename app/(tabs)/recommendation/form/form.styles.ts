import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: Colors.white,
  },
  title: {
    width: "90%",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
  },

  inputTitle: {
    color: Colors.black,
  },
  input: {
    borderColor: Colors.violet,
    color: Colors.black,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  validationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.violet,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  checkbox: {
    backgroundColor: Colors.violet,
  },
});

export default styles;
