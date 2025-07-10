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
  select: {
    backgroundColor: Colors.white,
    color: Colors.black,
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
