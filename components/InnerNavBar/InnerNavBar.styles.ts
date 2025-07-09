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
    backgroundColor: Colors.violet,
    width: "55%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: Colors.violet,
  },
  navbarButtonActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.violet,
    borderWidth: 4,
  },
  navbarText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  navbarTextActive: {
    color: Colors.violet,
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
