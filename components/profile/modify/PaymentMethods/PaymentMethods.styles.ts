import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    borderColor: Colors.violet,
    borderWidth: 4,
    borderRadius: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.black,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.violet,
    marginBottom: 16,
  },
  methodContainer: {
    flexDirection: width > 800 ? "row" : "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  informationsContainer: {
    flexDirection: "row",
  },
  informations: {
    height: 67,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  expiry: {
    fontSize: 14,
    color: Colors.grey,
  },
  default: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: width > 800 ? 0 : -10,
    marginBottom: 10,
  },
  defaultText: {
    fontSize: 18,
    color: Colors.violet,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: width > 800 ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: width > 800 ? 0 : -20,
  },
  actionButton: {
    width: width > 800 ? undefined : 150,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: width > 800 ? undefined : Colors.violet,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { styles };
export default styles;
