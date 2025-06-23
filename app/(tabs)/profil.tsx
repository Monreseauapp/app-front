import LinkedinIcon from "@/assets/icons/linkedin.svg";
import MailIcon from "@/assets/icons/mail.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import StarIcon from "@/assets/icons/star.svg";
import WebsiteIcon from "@/assets/icons/website.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Profil() {
  const { userId } = useContext(AppContext);
  const { profile } = useLocalSearchParams();
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      axios
        .get(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${
            profile || userId
          }/company`
        )
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.request);
        });
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 180,
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={
              user?.photoUrl
                ? { uri: user.photoUrl }
                : require("@/assets/images/profilepicture.jpg")
            }
            style={styles.profilePicture}
          />
          <Text style={styles.profileName}>
            {user?.firstName || "Prénom"} {user?.lastName || "Nom"}
          </Text>
          <Text style={styles.profileCompany}>{user?.company?.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          {user?.company?.linkedin && (
            <Pressable
              style={styles.icon}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/maxime-labbe-626012293/"
                )
              }
            >
              <LinkedinIcon color={Colors.accent} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.phone && (
            <Pressable
              style={styles.icon}
              onPress={() => Linking.openURL("tel:+33770107148")}
            >
              <PhoneIcon color={Colors.background} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.email && (
            <Pressable
              style={styles.icon}
              onPress={() => Linking.openURL("mailto:maxime30labbe@gmail.com")}
            >
              <MailIcon color={Colors.background} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.website && (
            <Pressable
              style={styles.icon}
              onPress={() =>
                Linking.openURL("https://www.maximelabbe.vercel.app/")
              }
            >
              <WebsiteIcon color={Colors.background} width={38} height={38} />
            </Pressable>
          )}
        </View>
        <View
          style={{ alignItems: "flex-start", marginBottom: 20, width: "90%" }}
        >
          {user?.company?.description && (
            <>
              <Text style={styles.miniTitle}>Description</Text>
              <Text style={styles.description}>{user.company.description}</Text>
            </>
          )}
          <Text style={styles.miniTitle}>Mes certifications</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            officia, vero blanditiis, eaque tempore perferendis eligendi placeat
            cupiditate commodi atque accusamus asperiores similique recusandae
            vel inventore pariatur neque vitae? Magni!
          </Text>
        </View>
        <View style={styles.projectsContainer}>
          <Text style={styles.miniTitle}>Supports et réalisations</Text>
          <View style={styles.projects}>
            <Image
              source={require("@/assets/images/wordle.png")}
              style={styles.image}
            />
            <Image
              source={require("@/assets/images/sudokusolver.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={{ alignItems: "flex-start", width: "90%" }}>
          <View>
            <Text style={{ ...styles.miniTitle, marginBottom: 10 }}>
              Mes avis (18)
            </Text>
            <View>
              {/* Mappez sur les avis ici */}
              <Text style={styles.review}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                officia, vero blanditiis, eaque tempore perferendis eligendi
                placeat cupiditate commodi atque accusamus asperiores similique
                recusandae vel inventore pariatur neque vitae? Magni!
              </Text>
              <Text style={styles.review}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                officia, vero blanditiis, eaque tempore perferendis eligendi
                placeat cupiditate commodi atque accusamus asperiores similique
                recusandae vel inventore pariatur neque vitae? Magni!
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              marginTop: 20,
              width: "100%",
              marginBottom: 80,
            }}
          >
            <Text style={styles.miniTitle}>Ma note</Text>
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
                  key={i}
                  color={i < 4 ? Colors.accent : Colors.text}
                  width={40}
                  height={40}
                  style={{ marginRight: 5 }}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  profileCompany: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  description: {
    width: "100%",
    fontSize: 16,
    color: Colors.text,
    marginTop: 10,
    padding: 10,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "left",
    marginBottom: 20,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.accent,
    marginLeft: 10,
  },
  projectsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
  },
  projects: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "45%",
    height: 90,
    borderRadius: 20,
    margin: 10,
  },
  review: {
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    fontSize: 16,
    color: Colors.background,
    marginBottom: 10,
  },
});
