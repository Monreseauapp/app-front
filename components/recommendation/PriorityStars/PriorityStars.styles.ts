import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  priority: {
    color: Colors.black,
    fontSize: width >= 768 ? 22 : 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
});

export default styles;
