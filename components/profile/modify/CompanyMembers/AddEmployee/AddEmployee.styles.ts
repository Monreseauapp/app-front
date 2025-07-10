import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSearch: {
    color: Colors.black,
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { styles };
export default styles;
