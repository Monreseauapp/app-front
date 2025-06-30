import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    top: 115,
    left: 185,
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
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
});

export default styles;
