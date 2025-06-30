import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    width: "50%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
  },
  navbarButton: {
    padding: 10,
    backgroundColor: Colors.accent,
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navbarButtonActive: {
    backgroundColor: Colors.background,
    borderColor: Colors.accent,
    borderWidth: 4,
  },
  navbarText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
  navbarTextActive: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
