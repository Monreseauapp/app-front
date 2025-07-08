import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  picker: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.violet,
  },
});

const webStyles = StyleSheet.create({
  picker: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: Colors.violet,
    color: Colors.white,
    fontSize: 18,
    borderColor: Colors.white,
    borderRadius: width >= 600 ? 10 : 5,
    padding: 10,
  },
});

export { styles, webStyles };
