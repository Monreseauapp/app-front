import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemsContainer: {
    width: "90%",
    maxHeight: 160,
    flexDirection: "column",
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderWidth: 4,
    borderColor: Colors.violet,
    top: 80,
    zIndex: 100,
  },
});

export default styles;
