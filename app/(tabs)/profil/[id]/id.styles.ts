import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  profileCompany: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  description: {
    width: "100%",
    fontSize: 16,
    color: Colors.text,
    marginTop: 10,
    padding: 10,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "left",
    marginBottom: 20,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.accent,
    marginLeft: 10,
  },
  projectsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
  },
  projects: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "45%",
    height: 90,
    borderRadius: 20,
    margin: 10,
  },
  review: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    marginBottom: 10,
  },
  reviewer: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 5,
    marginRight: 10,
  },
  reviewText: {
    fontSize: 16,
    color: Colors.background,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
});

const webStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: width >= 768 ? "row" : "column",
  },
});

export { styles, webStyles };
export default styles;
