import NotificationIcon from "@/assets/icons/notification.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import DashboardStats from "@/components/DashboardStats";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Link } from "expo-router";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { accountType, setAccountType } = useContext(AppContext);
  // For testing purposes, you can set accountType to "guest" or "company"
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
      <Link
        href="/notification"
        style={{
          position: "absolute",
          top: 70,
          left: 40,
        }}
      >
        <NotificationIcon width={40} height={40} color={Colors.accent} />
      </Link>
      {accountType === "guest" && (
        <View style={{ alignItems: "center", width: "90%" }}>
          <Text style={styles.title}>MON PROFIL</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ width: "40%", alignItems: "center" }}>
              <Image
                source={require("@/assets/images/profilepicture.jpg")}
                style={styles.image}
              />
            </View>
            <View
              style={{
                width: "60%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: -20,
              }}
            >
              <Text
                style={{ ...styles.profileDescription, fontWeight: "bold" }}
              >
                John Doe
              </Text>
              <Text style={styles.profileDescription}>Lille</Text>
              <Text style={styles.profileDescription}>
                Actif depuis juin 2025
              </Text>
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Modifier mon profil</Text>
          </Pressable>
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.title, marginBottom: 10 }}>
          MON TABLEAU DE BORD
        </Text>
        <DashboardStats
          title="Mes recommandations"
          stats={[
            { label: "En cours", value: "3" },
            { label: "Terminées", value: "15" },
          ]}
        />
        {accountType === "company" && (
          <>
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
          </>
        )}
      </View>
      {accountType === "guest" && (
        <Link
          style={{
            marginTop: 50,
            backgroundColor: Colors.accent,
            padding: 15,
            borderRadius: 50,
          }}
          href="/recommendation"
        >
          <PlusIcon width={50} height={50} color={Colors.background} />
        </Link>
      )}
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
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileDescription: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 20,
  },
});
