import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NavbarProps {
  isCompanyPage: boolean;
  setIsCompanyPage: (value: boolean) => void;
}

export default function NavBar({
  isCompanyPage,
  setIsCompanyPage,
}: NavbarProps) {
  return (
    <View style={styles.navbar}>
      <Pressable
        style={{
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          ...styles.navbarButton,
          ...(!isCompanyPage ? styles.navbarButtonActive : {}),
        }}
        onPress={() => setIsCompanyPage(false)}
      >
        <Text
          style={isCompanyPage ? styles.navbarText : styles.navbarTextActive}
        >
          Personnel
        </Text>
      </Pressable>
      <Pressable
        style={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          ...styles.navbarButton,
          ...(isCompanyPage ? styles.navbarButtonActive : {}),
        }}
        onPress={() => setIsCompanyPage(true)}
      >
        <Text
          style={isCompanyPage ? styles.navbarTextActive : styles.navbarText}
        >
          Entreprise
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 70,
    right: 60,
    width: "50%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
  },
  navbarButton: {
    padding: 10,
    backgroundColor: Colors.accent,
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navbarButtonActive: {
    backgroundColor: Colors.background,
    borderColor: Colors.accent,
    borderWidth: 4,
  },
  navbarText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
  navbarTextActive: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 16,
  },
});
