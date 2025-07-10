import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.violet,
    marginTop: 50,
  },
});

const webStyles = StyleSheet.create({
  title: {
    fontSize: width >= 768 ? 32 : 26,
    fontWeight: "bold",
    color: Colors.violet,
    marginTop: 20,
  },
  dashboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: width >= 1024 ? 40 : 0,
  },
});

export { styles, webStyles };
export default styles;
