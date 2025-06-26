import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NavbarProps {
  tabs: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  style?: object;
}

export default function NavBar({
  tabs,
  activeIndex,
  setActiveIndex,
  style,
}: NavbarProps) {
  return (
    <View style={{ ...styles.navbar, ...style }}>
      {tabs.map((tab, idx) => (
        <Pressable
          key={tab}
          style={[
            styles.navbarButton,
            idx === 0 && {
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
            idx === tabs.length - 1 && {
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
            idx === activeIndex && styles.navbarButtonActive,
          ]}
          onPress={() => setActiveIndex(idx)}
        >
          <Text
            style={
              idx === activeIndex ? styles.navbarTextActive : styles.navbarText
            }
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
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
    width: "50%",
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
