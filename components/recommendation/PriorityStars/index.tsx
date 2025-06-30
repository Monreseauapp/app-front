import StarIcon from "@/assets/icons/star.svg";
import { Colors } from "@/constants/Colors";
import { Pressable, Text, View } from "react-native";
import styles from "./PriorityStars.styles";

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
