import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.background,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 32,
    paddingVertical: 48,
    backgroundColor: Colors.accent,
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
    color: Colors.background,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 32,
  },
  googleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 40,
    borderRadius: 30,
    backgroundColor: Colors.background,
  },
});

export default styles;
