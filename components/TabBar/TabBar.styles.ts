import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    top: 115,
    left: width - 210,
    width: 200,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  tabBarItem: {
    position: "relative",
    flex: 1,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 25,
    shadowColor: "black",
    margin: 5,
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.15)",
  },
});

const webStyles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    top: 80,
    left: width >= 768 ? width - 300 - width / 16 : width - 210,
    width: width >= 768 ? 300 : 200,
    height: "auto",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  tabBarItem: {
    position: "relative",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 25,
    margin: 5,
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.15)",
  },
});

export { styles, webStyles };
export default styles;
