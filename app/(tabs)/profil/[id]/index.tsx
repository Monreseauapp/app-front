import BackIcon from "@/assets/icons/back.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import MailIcon from "@/assets/icons/mail.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import StarIcon from "@/assets/icons/star.svg";
import WebsiteIcon from "@/assets/icons/website.svg";
import { Colors } from "@/constants/Colors";
import { Company, Review, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./id.styles";

export default function Profil() {
  const router = useRouter();
  const { id, media } = useLocalSearchParams();
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewers, setReviewers] = useState<User[]>([]);
  const isAnyIcon = (company: Company) => {
    return (
      company.linkedin || company.phone || company.email || company.website
    );
  };

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
            `${process.env.EXPO_PUBLIC_API_URL}/review/company/${user?.companyId}`
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
      fetchProfileData(id as string);
      if (user?.companyId) {
        fetchReviews();
        fetchReviewersData();
      }
    };
    fetchData();
  }, [id, user?.companyId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        position: "relative",
      }}
    >
      <Pressable onPress={() => router.back()} style={styles.backIcon}>
        <BackIcon width={30} height={30} color={Colors.accent} />
      </Pressable>
      <ScrollView
        style={{ backgroundColor: Colors.background }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 180,
          position: "relative",
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
            {user?.company?.name && (
              <Text style={styles.profileCompany}>{user?.company?.name}</Text>
            )}
          </View>
          {user?.company && isAnyIcon(user?.company) && (
            <View style={styles.iconContainer}>
              {user?.company?.linkedin && (
                <Pressable
                  style={styles.icon}
                  onPress={() => Linking.openURL(user?.company?.linkedin || "")}
                >
                  <LinkedinIcon color={Colors.accent} width={40} height={40} />
                </Pressable>
              )}
              {user?.company?.phone && media === "yes" && (
                <Pressable
                  style={styles.icon}
                  onPress={() => Linking.openURL(`tel:${user?.company?.phone}`)}
                >
                  <PhoneIcon color={Colors.background} width={40} height={40} />
                </Pressable>
              )}
              {user?.company?.email && media === "yes" && (
                <Pressable
                  style={styles.icon}
                  onPress={() =>
                    Linking.openURL(`mailto:${user?.company?.email}`)
                  }
                >
                  <MailIcon color={Colors.background} width={40} height={40} />
                </Pressable>
              )}
              {user?.company?.website && (
                <Pressable
                  style={styles.icon}
                  onPress={() => Linking.openURL(user?.company?.website || "")}
                >
                  <WebsiteIcon
                    color={Colors.background}
                    width={38}
                    height={38}
                  />
                </Pressable>
              )}
            </View>
          )}
          <View
            style={{ alignItems: "flex-start", marginBottom: 20, width: "90%" }}
          >
            {user?.company?.description && (
              <>
                <Text style={styles.miniTitle}>Description</Text>
                <Text style={styles.description}>
                  {user.company.description}
                </Text>
              </>
            )}
            {/* <Text style={styles.miniTitle}>Mes certifications</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              officia, vero blanditiis, eaque tempore perferendis eligendi
              placeat cupiditate commodi atque accusamus asperiores similique
              recusandae vel inventore pariatur neque vitae? Magni!
            </Text> */}
          </View>
          {/* <View style={styles.projectsContainer}>
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
          </View> */}
          {reviews.length > 0 && (
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}
