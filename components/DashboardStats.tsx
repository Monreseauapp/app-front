import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface Stat {
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
        width: "90%",
        marginVertical: 20,
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

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uniqueStat: {
    flex: 1,
    flexDirection: "column",
    width: "50%",
    marginHorizontal: 3,
    padding: 20,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.background,
    marginVertical: 5,
  },
});
