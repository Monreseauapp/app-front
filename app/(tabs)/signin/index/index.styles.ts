import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  introText: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    width: "100%",
  },
  logo: {
    width: 320,
    height: 100,
    marginTop: -40,
  },
  connectionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 48,
    backgroundColor: Colors.violet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  form: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
  },
  passwordText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -10,
    marginBottom: 8,
    marginLeft: 16,
    textDecorationLine: "underline",
  },
  connectionButton: {
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: Colors.white,
    borderWidth: 5,
    borderRadius: 30,
  },
  connectionText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  googleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 40,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
});

const webStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    height: "100%",
  },
  logo: {
    width: width >= 1024 ? 480 : 320,
    height: width >= 1024 ? 150 : 100,
  },
  form: {
    width: width >= 600 ? "50%" : "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: width >= 1024 ? 32 : 16,
    paddingVertical: width >= 1024 ? 48 : 24,
    backgroundColor: Colors.violet,
    borderRadius: 30,
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: width >= 1024 ? 38 : 30,
    fontWeight: "bold",
    marginBottom: width >= 1024 ? 32 : 16,
  },
  passwordText: {
    color: Colors.white,
    fontSize: width >= 1024 ? 17 : 15,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 16,
    textDecorationLine: "underline",
  },
  connectionText: {
    color: Colors.white,
    fontSize: width >= 768 ? 20 : 18,
    fontWeight: "bold",
  },
});

export { styles, webStyles };
export default styles;
