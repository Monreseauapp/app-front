import BackIcon from "@/assets/icons/back.svg";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./notification.styles";

// AJOUTER UNE DIFFERENCE ENTRE READ ET UNREAD

export default function Notification() {
  const router = useRouter();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{ position: "absolute", top: 70, left: 40 }}
        onPress={() => router.back()}
      >
        <BackIcon width={30} height={30} color={Colors.accent} />
      </Pressable>
      <Text style={styles.title}>MON ACTUALITE</Text>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          marginTop: 20,
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>AUJOURD'HUI</Text>
          <View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Votre profil a été consulté par un membre de votre réseau.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>LE 17 JUIN 2025</Text>
          <View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Votre profil a été consulté par un membre de votre réseau.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>LE 16 JUIN 2025</Text>
          <View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                Vous avez reçu une nouvelle demande de contact.
              </Text>
            </View>
            <View style={styles.notification}>
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
