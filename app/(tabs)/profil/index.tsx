import LinkedinIcon from "@/assets/icons/linkedin.svg";
import MailIcon from "@/assets/icons/mail.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import StarIcon from "@/assets/icons/star.svg";
import WebsiteIcon from "@/assets/icons/website.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Review, User } from "@/types";
import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
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
  const { userId, companyId } = useContext(AppContext);
  const { profilId } = useLocalSearchParams();
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewers, setReviewers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchProfileData = async (id: string) => {
        const response = await axios
          .get(`${process.env.EXPO_PUBLIC_API_URL}/users/${id}/company`)
          .then((response) => {
            const userData = response.data;
            setUser(userData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error.request);
          });
        return response;
      };
      const fetchReviews = async () => {
        const response = await axios
          .get(
            `${process.env.EXPO_PUBLIC_API_URL}/review/company/${
              user?.companyId || companyId
            }`
          )
          .then((response) => {
            const reviewsData = response.data;
            setReviews(reviewsData);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error.request);
          });
        return response;
      };
      const fetchReviewersData = async () => {
        const userPromises = reviews.map((review) =>
          axios.get<User>(
            `${process.env.EXPO_PUBLIC_API_URL}/users/${review.userId}`
          )
        );
        const responses = await Promise.all(userPromises);
        setReviewers(responses.map((res) => res.data));
      };
      fetchProfileData((profilId as string) || (userId as string));
      if (companyId) {
        fetchReviews();
        fetchReviewersData();
      }
    };
    fetchData();
  }, [profilId, userId, companyId]);

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
              onPress={() => Linking.openURL(user?.company?.linkedin || "")}
            >
              <LinkedinIcon color={Colors.accent} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.phone && (
            <Pressable
              style={styles.icon}
              onPress={() => Linking.openURL(`tel:${user?.company?.phone}`)}
            >
              <PhoneIcon color={Colors.background} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.email && (
            <Pressable
              style={styles.icon}
              onPress={() => Linking.openURL(`mailto:${user?.company?.email}`)}
            >
              <MailIcon color={Colors.background} width={40} height={40} />
            </Pressable>
          )}
          {user?.company?.website && (
            <Pressable
              style={styles.icon}
              onPress={() => Linking.openURL(user?.company?.website || "")}
            >
              <WebsiteIcon color={Colors.background} width={38} height={38} />
            </Pressable>
          )}
        </View>
        <Link style={styles.button} href="/profil/modify?type=company">
          <Text style={styles.buttonText}>Modifier mon profil</Text>
        </Link>
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
          <View style={{ width: "100%" }}>
            <Text style={{ ...styles.miniTitle, marginBottom: 10 }}>
              Mes avis ({reviews.length})
            </Text>
            <View style={{ width: "100%" }}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.review}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.reviewer}>
                      {(() => {
                        const reviewer = reviewers.find(
                          (user) => user.id === review.userId
                        );
                        return reviewer
                          ? `${reviewer.firstName} ${reviewer.lastName}`
                          : "Utilisateur inconnu";
                      })()}
                    </Text>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        color={
                          i < (review.rating || 0)
                            ? Colors.background
                            : Colors.text
                        }
                        width={20}
                        height={20}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))}
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
                  color={
                    i <
                    reviews.reduce(
                      (acc, review) => acc + (review.rating || 0),
                      0
                    ) /
                      reviews.length
                      ? Colors.accent
                      : Colors.text
                  }
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
    width: "100%",
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    marginBottom: 10,
  },
  reviewer: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 5,
    marginRight: 10,
  },
  reviewText: {
    fontSize: 16,
    color: Colors.background,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
});
