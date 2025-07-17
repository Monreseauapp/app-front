import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.violet,
    marginBottom: 20,
    marginTop: 140,
  },
  noRecommendations: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    marginTop: 20,
    width: "80%",
  },
});

export default styles;
