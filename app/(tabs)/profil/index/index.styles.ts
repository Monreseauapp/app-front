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
    color: Colors.black,
  },
  profileCompany: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.violet,
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
    backgroundColor: Colors.violet,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  description: {
    width: "100%",
    fontSize: 16,
    color: Colors.black,
    marginTop: 10,
    padding: 10,
    borderColor: Colors.violet,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "left",
    marginBottom: 20,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.violet,
    marginLeft: 10,
  },
  projectsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderColor: Colors.violet,
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
    backgroundColor: Colors.violet,
    borderRadius: 20,
    marginBottom: 10,
  },
  reviewer: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 5,
    marginRight: 10,
  },
  reviewText: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.violet,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const webStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: width >= 768 ? "row" : "column",
    justifyContent: "center",
  },
});

export { styles, webStyles };
export default styles;
