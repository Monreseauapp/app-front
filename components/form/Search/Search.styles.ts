import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
    overflow: "visible",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingLeft: 16,
    color: Colors.white,
  },
  required: {
    color: Colors.red,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.violet,
    color: Colors.white,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemsContainer: {
    width: "90%",
    maxHeight: 160,
    flexDirection: "column",
    position: "absolute",
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderWidth: 4,
    borderColor: Colors.violet,
    top: 80,
    zIndex: 100,
  },
  item: {
    color: Colors.black,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: Colors.violet,
  },
});

export default styles;
