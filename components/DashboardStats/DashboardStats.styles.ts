import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uniqueStat: {
    flex: 1,
    flexDirection: "column",
    width: "50%",
    marginHorizontal: 3,
    padding: 20,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.background,
    marginVertical: 5,
  },
});

export default styles;
