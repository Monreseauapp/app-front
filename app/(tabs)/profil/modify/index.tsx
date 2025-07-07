import CustomCheckbox from "@/components/form/CustomCheckbox";
import DocumentInput from "@/components/form/DocumentInput";
import Input from "@/components/form/Input";
import InnerNavBar from "@/components/InnerNavBar";
import JobInformations from "@/components/profile/modify/JobInformations";
import LinksInputs from "@/components/profile/modify/LinksInputs";
import PersonalInformations from "@/components/profile/modify/PersonalInformations";
import { Colors } from "@/constants/Colors";
import { initialCompany } from "@/constants/initial-types-value/initialCompany";
import { initialUser } from "@/constants/initial-types-value/initialUser";
import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles, webStyles } from "./modify.styles";

export default function ModifyProfile() {
  const { API_URL, userId, companyId } = useContext(AppContext);
  const router = useRouter();
  const [isCompanyPage, setIsCompanyPage] = useState(false);
  const [user, setUser] = useState<User>(initialUser);
  const [company, setCompany] = useState<Company>(initialCompany);
  const [jobDomains, setJobDomains] = useState<
    { id: string; domaine: string }[]
  >([]);
  const [image, setImage] = useState<object | null>(null);

  const handleChange = (
    type: "user" | "company",
    key: keyof User | keyof Company,
    value: string | number | boolean | undefined
  ) => {
    if (key !== "addressComplement") {
      if (type === "company") {
        setCompany((prevCompany) => ({
          ...prevCompany,
          [key]: value,
        }));
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          [key]: value,
        }));
      }
    }
  };

  useEffect(() => {
    if (!companyId) {
      const fetchUserData = async () => {
        axios
          .get(`${API_URL}/users/${userId}`)
          .then((response) => {
            const { password, ...userData } = response.data;
            setUser(userData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error.request);
          });
      };
      fetchUserData();
      setCompany(initialCompany);
    } else {
      console.log("here");
      const fetchCompanyData = async () => {
        axios
          .get(`${API_URL}/users/${userId}/company`)
          .then((response) => {
            const data = response.data;
            const { company, password, ...userData } = data;
            setUser(userData);
            setCompany(company);
          })
          .catch((error) => {
            console.error("Error fetching company data:", error.request);
          });
      };
      fetchCompanyData();
    }
  }, [companyId, userId]);

  const updateData = async () => {
    axios.patch(`${API_URL}/users/${userId}`, { ...user }).catch((error) => {
      console.error("Error updating user:", error.request);
    });
    if (company) {
      axios
        .patch(`${API_URL}/company/${company.id}`, { ...company })
        .catch((error) => {
          console.error("Error updating company:", error.request);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback
        onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            position: "relative",
          }}
        >
          {companyId && (
            <InnerNavBar
              tabs={["Personnel", "Entreprise"]}
              activeIndex={isCompanyPage ? 1 : 0}
              setActiveIndex={() => setIsCompanyPage(!isCompanyPage)}
              style={{
                position: "absolute",
                top: Platform.OS === "web" ? 30 : 65,
                left: "50%",
                transform: [{ translateX: "-55%" }],
              }}
            />
          )}

          <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={{
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 160,
            }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={true}
            extraScrollHeight={-200}
            enableOnAndroid={true}
          >
            <Text style={styles.title}>Modifier mon profil</Text>
            <View
              style={
                Platform.OS === "web"
                  ? webStyles.inputsContainer
                  : styles.inputsContainer
              }
            >
              <PersonalInformations
                user={user}
                company={company}
                isCompanyPage={isCompanyPage}
                handleChange={handleChange}
              />
              {((!isCompanyPage &&
                user.allowRecommendationDataAccess !== undefined) ||
                isCompanyPage) && (
                <>
                  <Text style={styles.checkBoxTitle}>
                    {isCompanyPage
                      ? "Souhaitez-vous recevoir des recommandations ?"
                      : "Autoriser l'accès à vos données pour les entreprises lors des recommandations :"}
                  </Text>
                  <CustomCheckbox
                    checked={
                      isCompanyPage
                        ? company.OpentoReco
                        : user.allowRecommendationDataAccess || false
                    }
                    onChange={(value) =>
                      handleChange(
                        isCompanyPage ? "company" : "user",
                        isCompanyPage
                          ? "OpentoReco"
                          : "allowRecommendationDataAccess",
                        value
                      )
                    }
                    width={35}
                    height={35}
                    style={styles.checkBox}
                    markerStyle={Colors.background}
                  />
                </>
              )}
              <DocumentInput
                title="Photo de profil"
                type={["image/jpeg", "image/png", "image/webp"]}
                setValue={setImage}
              />
              {!isCompanyPage && (
                <JobInformations
                  user={user}
                  handleChange={(field, value) =>
                    handleChange(
                      isCompanyPage ? "company" : "user",
                      field,
                      value
                    )
                  }
                />
              )}
              <LinksInputs
                user={user}
                company={company}
                isCompanyPage={isCompanyPage}
                handleChange={handleChange}
              />
              {isCompanyPage && (
                <Input
                  name="Description"
                  placeholder="Entrez une description"
                  type="off"
                  multiline={true}
                  value={company.description || ""}
                  onChangeText={(text) =>
                    handleChange("company", "description", text)
                  }
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                    height: 100,
                  }}
                  titleStyle={styles.inputTitle}
                />
              )}
              <Pressable
                style={styles.button}
                onPress={() => {
                  updateData();
                  router.back();
                }}
              >
                <Text style={styles.buttonText}>Sauvegarder et quitter</Text>
              </Pressable>
              <View style={{ height: 100 }}></View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
