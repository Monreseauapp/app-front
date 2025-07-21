import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  errorText: {
    color: Colors.red,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export { styles };
export default styles;
