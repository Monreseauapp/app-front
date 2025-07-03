import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import { styles, webStyles } from "./notification.styles";

// AJOUTER UNE DIFFERENCE ENTRE READ ET UNREAD

export default function Notification() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>MON ACTUALITE</Text>
      <ScrollView
        style={{
          flex: 1,
          width: width >= 768 ? "80%" : "100%",
          marginTop: 20,
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          gap: 30,
        }}
      >
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>AUJOURD'HUI</Text>
          <View style={styles.notifications}>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Votre profil a été consulté par un membre de votre réseau.
              </Text>
            </View>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>LE 17 JUIN 2025</Text>
          <View style={styles.notifications}>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Votre profil a été consulté par un membre de votre réseau.
              </Text>
            </View>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>LE 16 JUIN 2025</Text>
          <View style={styles.notifications}>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.notification
                  : styles.notification
              }
            >
              <Text style={styles.notificationText}>
                Votre profil a été consulté par un membre de votre réseau.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
