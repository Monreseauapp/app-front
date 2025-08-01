import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 24,
    backgroundColor: Colors.violet,
  },
  logo: {
    width: 320,
    height: 100,
    position: "absolute",
    top: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: Colors.violet,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginVertical: 30,
  },
  span: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: Colors.white,
  },
  listElem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    maxWidth: "95%",
  },
  bullet: {
    fontSize: 24,
    marginRight: 8,
    color: Colors.white,
  },
});

const webStyles = StyleSheet.create({
  logo: {
    width: width >= 1024 ? 480 : width >= 600 ? 320 : 240,
    height: width >= 1024 ? 150 : width >= 600 ? 100 : 75,
  },
  title: {
    fontSize: width > 768 ? 30 : 24,
    fontWeight: "bold",
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: Colors.violet,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: width >= 600 ? 30 : 15,
    textAlign: "center",
  },
});

export { styles, webStyles };
export default styles;
