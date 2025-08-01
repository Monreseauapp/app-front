import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 320,
    height: 100,
    marginBottom: 0,
  },
  span: {
    fontWeight: "bold",
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    width: "70%",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: Colors.violet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
});

const webStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: width >= 600 ? 320 : 160,
    height: width >= 600 ? 100 : 50,
    marginBottom: 0,
  },
  introText: {
    fontSize: width >= 600 ? 18 : 16,
    textAlign: "center",
    marginBottom: 30,
    width: "70%",
  },
  formContainer: {
    width: width >= 800 ? "55%" : "90%",
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: width >= 600 ? 0 : 50,
    backgroundColor: Colors.violet,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 50,
  },
});

export { styles, webStyles };
export default styles;
