import { Platform, Pressable, Text, View } from "react-native";

import { styles, webStyles } from "./InnerNavBar.styles";

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
    <View
      style={{
        ...Platform.select({ web: webStyles.navbar, default: styles.navbar }),
        ...style,
      }}
    >
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
