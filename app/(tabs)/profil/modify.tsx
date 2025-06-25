import BackIcon from "@/assets/icons/back.svg";
import Input from "@/components/form/Input";
import JobInformations from "@/components/profile/modify/JobInformations";
import LinksInputs from "@/components/profile/modify/LinksInputs";
import NavBar from "@/components/profile/modify/NavBar";
import PersonalInformations from "@/components/profile/modify/PersonalInformations";
import { Colors } from "@/constants/Colors";
import { initialCompany } from "@/constants/initial-types-value/initialCompany";
import { initialUser } from "@/constants/initial-types-value/initialUser";
import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ModifyProfile() {
  const { API_URL, userId } = useContext(AppContext);
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const [isCompanyPage, setIsCompanyPage] = useState(false);
  const [user, setUser] = useState<User>(initialUser);
  const [company, setCompany] = useState<Company>(initialCompany);
  const [jobDomains, setJobDomains] = useState<
    { id: string; domaine: string }[]
  >([]);

  const handleChangeUser = (
    key: keyof User,
    value: string | number | undefined
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const handleChangeCompany = (
    key: keyof Company,
    value: string | number | undefined
  ) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (type === "guest") {
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
    } else {
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
    const fetchJobDomains = async () => {
      axios
        .get(`${API_URL}/job-domain`)
        .then((response) => {
          setJobDomains(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job domains:", error.request);
        });
    };
    fetchJobDomains();
  }, []);

  const updateData = async () => {
    axios.patch(`${API_URL}/users/${userId}`, { ...user }).catch((error) => {
      console.error("Error updating user:", error.request);
    });
    if (type === "company") {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            position: "relative",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={styles.backIcon}
            hitSlop={20}
          >
            <BackIcon color={Colors.accent} width={30} height={30} />
          </Pressable>
          {type === "company" && (
            <NavBar
              isCompanyPage={isCompanyPage}
              setIsCompanyPage={setIsCompanyPage}
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
            <View style={styles.inputsContainer}>
              <PersonalInformations
                user={user}
                company={company}
                isCompanyPage={isCompanyPage}
                handleChangeUser={handleChangeUser}
                handleChangeCompany={handleChangeCompany}
              />
              {!isCompanyPage && (
                <JobInformations
                  user={user}
                  jobDomains={jobDomains}
                  handleChangeUser={handleChangeUser}
                />
              )}
              <LinksInputs
                user={user}
                company={company}
                isCompanyPage={isCompanyPage}
                handleChangeUser={handleChangeUser}
                handleChangeCompany={handleChangeCompany}
              />
              {isCompanyPage && (
                <Input
                  name="Description"
                  placeholder="Entrez une description"
                  type="off"
                  multiline={true}
                  value={company.description || ""}
                  onChangeText={(text) =>
                    handleChangeCompany("description", text)
                  }
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                    // height: 100,
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  backIcon: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputsContainer: {
    width: "90%",
    flexDirection: "column",
    alignSelf: "center",
    // marginBottom: 70,
  },
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
});
