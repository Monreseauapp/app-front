import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import styles from "./DashboardStats.styles";

export interface Stat {
  label: string;
  value: string | number;
}

interface DashboardStatsProps {
  title: string;
  stats: [Stat, Stat];
}

export default function DashboardStats({ title, stats }: DashboardStatsProps) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: "auto",
      }}
      testID="dashboard-item"
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.black }}>
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
