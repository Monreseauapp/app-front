import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uniqueStat: {
    flex: 1,
    flexDirection: "column",
    width: width >= 1024 ? 200 : 150,
    marginHorizontal: 3,
    padding: 20,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    fontSize: width >= 1024 ? 26 : 22,
    fontWeight: "bold",
    color: Colors.background,
    marginVertical: 5,
  },
});

export default styles;
