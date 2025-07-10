import StarIcon from "@/assets/icons/star.svg";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

type PriorityStarsProps = {
  stars?: number;
  activeColor?: string;
  inactiveColor?: string;
};

export default function PriorityStars({
  stars = 1,
  activeColor,
  inactiveColor,
}: PriorityStarsProps) {
  return (
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
        <StarIcon
          color={
            i <= stars - 1
              ? activeColor || Colors.violet
              : inactiveColor || Colors.black
          }
          width={40}
          height={40}
          style={{ marginRight: 5 }}
          key={i}
        />
      ))}
    </View>
  );
}
