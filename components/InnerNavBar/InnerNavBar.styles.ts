import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  navbar: {
    width: "50%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
    alignSelf: "center",
  },
  navbarButton: {
    padding: 10,
    backgroundColor: Colors.accent,
    width: "55%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: Colors.accent,
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

const webStyles = StyleSheet.create({
  navbar: {
    width: width >= 600 ? "40%" : "50%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
    alignSelf: "center",
  },
});

export { styles, webStyles };
export default styles;
