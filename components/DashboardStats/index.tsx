import { Colors } from "@/constants/Colors";
import { Dimensions, Text, View } from "react-native";
import styles from "./DashboardStats.styles";

interface Stat {
  label: string;
  value: string | number;
}

interface DashboardStatsProps {
  title: string;
  stats: [Stat, Stat];
}

export default function DashboardStats({ title, stats }: DashboardStatsProps) {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
        marginVertical: width >= 768 ? 20 : 10,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.text }}>
          {title}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View
            key={index}
            style={{
              ...styles.uniqueStat,
              borderTopLeftRadius: index ? 0 : 20,
              borderTopRightRadius: index ? 20 : 0,
              borderBottomLeftRadius: index ? 0 : 20,
              borderBottomRightRadius: index ? 20 : 0,
            }}
          >
            <Text style={styles.statText}>{stat.label}</Text>
            <Text style={styles.statText}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
