import LinkedinIcon from "@/assets/icons/linkedin.svg";
import MailIcon from "@/assets/icons/mail.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import StarIcon from "@/assets/icons/star.svg";
import WebsiteIcon from "@/assets/icons/website.svg";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Review, User } from "@/types";
import axios from "axios";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./index.styles";
import { Buffer } from "buffer";
export default function Profil() {
  const { width } = Dimensions.get("window");
  const { API_URL, userId, companyId } = useContext(AppContext);
  const [user, setUser] = useState<(User & { company: Company }) | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewers, setReviewers] = useState<User[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const fetchProfileData = async (id: string) => {
          const response = await axios
            .get(`${API_URL}/users/${id}`)
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
            .get(`${API_URL}/review/company/${companyId}`)
            .then((response) => response.data)
            .catch((error) => {
              console.error("Error fetching reviews:", error.request);
            });
          setReviews(response);
        };
        fetchProfileData(userId as string);
        if (companyId) {
          fetchReviews();
        }
      };
      fetchData();
    }, [userId, companyId, API_URL]),
  );
  useEffect(() => {
    const fetchReviewers = async () => {
      const userPromises = reviews.map((review) =>
        axios.get<User>(`${API_URL}/users/${review.userId}`),
      );
      const responses = await Promise.all(userPromises);
      setReviewers(responses.map((res) => res.data));
    };
    if (reviews.length > 0) {
      fetchReviewers();
    }
  }, [reviews, API_URL]);
  useEffect(() => {
    if (user?.photoUrl) {
      axios
        .get(`${API_URL}/files/view/${user.photoUrl}`, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          const base64 = Buffer.from(res.data, "binary").toString("base64");
          setImageUri(`data:image/jpeg;base64,${base64}`);
        });
    }
  }, [user?.photoUrl, API_URL]);
  return (
    <ScrollView
      style={{ backgroundColor: Colors.white }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 180,
      }}
    >
      <View
        style={Platform.OS === "web" ? webStyles.container : styles.container}
      >
        <View
          style={
            Platform.OS === "web" && {
              width: width >= 768 ? "30%" : "100%",
              alignItems: "center",
            }
          }
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
              source={
                user?.photoUrl
                  ? { uri: imageUri }
                  : require("@/assets/images/default-user.jpg")
              }
              style={styles.profilePicture}
              testID="profile-picture"
            />
            <Text style={styles.profileName} testID="profile-name">
              {user?.firstName || "Prénom"} {user?.lastName || "Nom"}
            </Text>
            <Text style={styles.profileCompany} testID="profile-company">
              {user?.company?.name}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            {user?.company?.linkedin && (
              <Pressable
                style={styles.icon}
                onPress={() => Linking.openURL(user?.company?.linkedin || "")}
                testID="external-link"
              >
                <LinkedinIcon color={Colors.violet} width={40} height={40} />
              </Pressable>
            )}
            {user?.company?.phone && (
              <Pressable
                style={styles.icon}
                onPress={() => Linking.openURL(`tel:${user?.company?.phone}`)}
                testID="external-link"
              >
                <PhoneIcon color={Colors.white} width={40} height={40} />
              </Pressable>
            )}
            {user?.company?.email && (
              <Pressable
                style={styles.icon}
                onPress={() =>
                  Linking.openURL(`mailto:${user?.company?.email}`)
                }
                testID="external-link"
              >
                <MailIcon color={Colors.white} width={40} height={40} />
              </Pressable>
            )}
            {user?.company?.website && (
              <Pressable
                style={styles.icon}
                onPress={() => Linking.openURL(user?.company?.website || "")}
                testID="external-link"
              >
                <WebsiteIcon color={Colors.white} width={38} height={38} />
              </Pressable>
            )}
          </View>
          <Link
            style={styles.button}
            href="/profil/modify"
            testID="modify-profile"
          >
            <Text style={styles.buttonText}>Modifier mon profil</Text>
          </Link>
        </View>
        {user?.company?.description && reviews.length > 0 && (
          <View
            style={
              Platform.OS === "web"
                ? {
                    width: width >= 768 ? "70%" : "100%",
                    alignItems: "center",
                  }
                : { width: "100%", alignItems: "center" }
            }
          >
            <View
              style={{
                alignItems: "flex-start",
                marginBottom: 20,
                width: "90%",
              }}
            >
              {user?.company?.description && (
                <>
                  <Text style={styles.miniTitle}>Description</Text>
                  <Text style={styles.description} testID="company-description">
                    {user.company.description}
                  </Text>
                </>
              )}
            </View>
            {reviews.length > 0 && (
              <View style={{ alignItems: "flex-start", width: "90%" }}>
                <View style={{ width: "100%" }}>
                  <Text style={{ ...styles.miniTitle, marginBottom: 10 }}>
                    Mes avis ({reviews.length})
                  </Text>
                  <View style={{ width: "100%" }}>
                    {reviews.map((review) => (
                      <View
                        key={review.id}
                        style={styles.review}
                        testID="review"
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text style={styles.reviewer}>
                            {(() => {
                              const reviewer = reviewers.find(
                                (user) => user.id === review.userId,
                              );
                              return reviewer
                                ? `${reviewer.firstName} ${reviewer.lastName}`
                                : "Utilisateur inconnu";
                            })()}
                          </Text>
                          {[...Array(5)].map((_, i) => (
                            <View key={i} testID="star-icon">
                              <StarIcon
                                key={i}
                                color={
                                  i < (review.rating || 0)
                                    ? Colors.white
                                    : Colors.black
                                      ? Colors.white
                                      : Colors.black
                                }
                                width={20}
                                height={20}
                                style={{ marginRight: 2 }}
                              />
                            </View>
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
                            0,
                          ) /
                            reviews.length
                            ? Colors.violet
                            : Colors.black
                              ? Colors.violet
                              : Colors.black
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
        )}
      </View>
    </ScrollView>
  );
}
