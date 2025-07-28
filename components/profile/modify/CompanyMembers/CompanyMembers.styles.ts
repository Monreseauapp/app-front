import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: 4,
    borderColor: Colors.violet,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderColor: Colors.violet,
    borderBottomWidth: 3,
  },
  member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: Colors.violet,
  },
  memberInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "50%",
  },
  memberText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: "bold",
  },
  memberRole: {
    fontSize: 16,
    color: Colors.black,
  },
  ownerRole: {
    fontSize: 16,
    color: Colors.violet,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export { styles };
export default styles;
