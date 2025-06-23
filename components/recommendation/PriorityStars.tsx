import StarIcon from "@/assets/icons/star.svg";
import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PriorityStars({
  starId,
  setStarId,
}: {
  starId: number;
  setStarId: (value: number) => void;
}) {
  return (
    <View
      style={{
        alignItems: "flex-start",
        marginTop: 10,
        width: "100%",
        marginBottom: 10,
      }}
    >
      <Text style={styles.priority}>Niveau de priorité</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Pressable
            key={i}
            onPress={() => {
              setStarId(i);
            }}
          >
            <StarIcon
              color={i <= starId ? Colors.accent : Colors.text}
              width={40}
              height={40}
              style={{ marginRight: 5 }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priority: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginLeft: 25,
  },
});
