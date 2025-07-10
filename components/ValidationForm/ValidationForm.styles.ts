import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.white,
  },
  span: {
    fontWeight: "bold",
  },
  choiceContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.lightGrey,
  },
  choiceButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  choiceButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
  validationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.violet,
    marginTop: 10,
  },
  validationText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
