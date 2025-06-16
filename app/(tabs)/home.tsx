import { Colors } from "@/constants/Colors";
import { ScrollView, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.background,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome!</Text>
    </ScrollView>
  );
}
