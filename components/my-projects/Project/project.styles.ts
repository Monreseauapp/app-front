import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  accepted: {
    color: Colors.green,
  },
  rejected: {
    color: Colors.red,
  },
  nameContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontStyle: "italic",
  },
  description: {
    width: "90%",
    marginVertical: 12,
    textAlign: "center",
  },
  contactContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contactTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  contactText: {
    textAlign: "center",
  },
  priorityContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  stateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});

export default styles;
