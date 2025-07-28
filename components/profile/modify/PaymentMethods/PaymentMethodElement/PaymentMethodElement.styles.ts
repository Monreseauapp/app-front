import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    maxHeight: 500,
    padding: 20,
  },
  button: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    minWidth: 150,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export { styles };
export default styles;
