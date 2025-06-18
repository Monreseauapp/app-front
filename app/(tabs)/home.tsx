import DashboardStats from "@/components/DashboardStats";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Text style={styles.title}>MON TABLEAU DE BORD</Text>
      <DashboardStats
        title="Mes recommandations"
        stats={[
          { label: "En cours", value: "3" },
          { label: "Terminées", value: "15" },
        ]}
      />
      <DashboardStats
        title="Mes recommandations reçues"
        stats={[
          { label: "En cours", value: "6" },
          { label: "Terminées", value: "23" },
        ]}
      />
      <DashboardStats
        title="Mes chiffres"
        stats={[
          { label: "Encaissés", value: "7885€" },
          { label: "Données", value: "1568€" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.accent,
    marginTop: 50,
  },
});
