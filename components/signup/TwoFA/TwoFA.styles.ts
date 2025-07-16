import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  background: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.black,
    opacity: 0.3,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  infoContainer: {
    opacity: 1,
    zIndex: 10,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    width: width >= 1024 ? "60%" : "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: width >= 1024 ? 30 : 24,
    fontWeight: "bold",
    color: Colors.violet,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: width >= 1024 ? 20 : 16,
    color: Colors.black,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: width >= 1024 ? 250 : 150,
    height: width >= 1024 ? 250 : 150,
    marginBottom: 20,
  },
  secret: {
    fontSize: width >= 1024 ? 24 : 18,
    color: Colors.violet,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.violet,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: width >= 1024 ? 20 : 18,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
});

export { styles };
export default styles;
