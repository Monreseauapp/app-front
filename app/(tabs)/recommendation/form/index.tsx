import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import Search from "@/components/form/Search/Search";
import CompanyDetails from "@/components/recommendation/CompanyDetails";
import DetailsInput from "@/components/recommendation/DetailsInput";
import PersonalInformations from "@/components/recommendation/PersonalInformations";
import PersonTypeSelector from "@/components/recommendation/PersonTypeSelector";
import PriorityStars from "@/components/recommendation/PriorityStars";
import { Colors } from "@/constants/Colors";
import { initialProject } from "@/constants/initial-types-value/initialProject";
import { initialRecommendation } from "@/constants/initial-types-value/initialRecommendation";
import { AppContext } from "@/context/context";
import useFormValidation from "@/hooks/useFormValidation";
import { Project, Recommandation, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./form.styles";

type RecommendationFormParams = {
  type: "company" | "lead" | "project";
};

type RecommendationFormTitles = {
  label: RecommendationFormParams["type"];
  title: string;
  sendText: string;
};

export default function RecommendationForm() {
  const { width } = Dimensions.get("window");
  const { API_URL, userId } = useContext(AppContext);
  const router = useRouter();
  const { type } = useLocalSearchParams<RecommendationFormParams>();
  const titles: RecommendationFormTitles[] = [
    {
      label: "company",
      title: "JE RECOMMANDE",
      sendText: "Envoyer ma recommandation",
    },
    {
      label: "lead",
      title: "J'APPORTE UN PROSPECT",
      sendText: "Envoyer mon prospect",
    },
    {
      label: "project",
      title: "JE DEPOSE UN PROJET",
      sendText: "Envoyer mon projet",
    },
  ];
  const [starId, setStarId] = useState<number>(0);
  const [recommandation, setRecommandation] = useState<Recommandation>({
    ...initialRecommendation,
    initiatorId: userId?.toString() || "",
    ...(type === "lead" ? { priority: starId + 1 } : {}),
  });
  const [project, setProject] = useState<Project>({
    ...initialProject,
    userId: userId?.toString() || "",
    priority: starId + 1,
  });
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>(
    []
  );
  const [users, setUsers] = useState<User[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [internUser, setInternUser] = useState<boolean>(true);
  const [internCompany, setInternCompany] = useState<boolean>(true);
  const [isDataValid, setIsDataValid] = useState<boolean | undefined>(
    undefined
  );

  const resetForm = () => {
    setRecommandation(initialRecommendation);
    setProject({
      ...initialProject,
      userId: userId?.toString() || "",
    });
    setCompanyName("");
    setUserName("");
    setInternUser(true);
    setInternCompany(true);
    setIsDataValid(undefined);
    setStarId(0);
  };

  const handleChange = (
    key: keyof Recommandation | keyof Project,
    value: any
  ) => {
    if (type === "project" && key in project) {
      setProject((prev) => ({ ...prev, [key]: value }));
      return;
    }
    setRecommandation((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (type !== "lead") {
      const fetchCompanies = async () => {
        axios.get(`${API_URL}/company`).then((response) => {
          const resp = response.data;
          setCompanies(
            resp.map((company: { id: string; name: string }) => ({
              id: company.id,
              name: company.name,
            }))
          );
        });
      };
      fetchCompanies();
    }
    const fetchUsers = async () => {
      axios.get(`${API_URL}/users`).then((response) => {
        const resp = response.data;
        setUsers(resp.filter((user: User) => user.companyId));
      });
    };
    fetchUsers();
  }, []);

  const sendRecommendationData = async () => {
    axios
      .post(`${API_URL}/recommandation`, {
        ...recommandation,
        recipientId: users.find(
          (u) => u.firstName + " " + u.lastName === userName
        )?.id,
      })
      .catch((error) => {
        console.error("Error sending recommendation:", error);
      });
  };

  const sendProjectData = async () => {
    axios
      .post(`${API_URL}/project`, {
        ...project,
        isPublic: project.companyId ? false : true,
      })
      .catch((error) => {
        console.error("Error sending project:", error);
      });
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
          <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={{
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 160,
            }}
            keyboardShouldPersistTaps="always"
            extraScrollHeight={-100}
          >
            <Text style={styles.title}>
              {titles.find((title) => title.label === type)?.title}
            </Text>
            <View
              style={{
                width: width > 768 ? "50%" : "90%",
                alignSelf: "center",
              }}
            >
              {type !== "lead" && (
                <>
                  <PersonTypeSelector
                    intern={internCompany}
                    setIntern={setInternCompany}
                    type="company"
                  />
                  {internCompany ? (
                    <Search
                      name="Nom de l'entreprise"
                      list={companies.map((c) => c.name)}
                      placeholder="Chercher une entreprise..."
                      titleStyle={styles.inputTitle}
                      inputStyle={{
                        ...styles.input,
                        color: Colors.background,
                        placeholderTextColor: Colors.background,
                      }}
                      value={companyName}
                      onChangeText={(text) => {
                        setCompanyName(text);
                        handleChange(
                          "companyId",
                          companies.find((c) => c.name === text)?.id || ""
                        );
                      }}
                      valid={isDataValid}
                    />
                  ) : (
                    <>
                      <CompanyDetails
                        data={type === "company" ? recommandation : project}
                        handleChange={handleChange}
                        isDataValid={isDataValid}
                      />
                    </>
                  )}
                </>
              )}
              {type !== "project" ? (
                <>
                  <PersonTypeSelector
                    intern={internUser}
                    setIntern={setInternUser}
                    type="user"
                  />
                  {internUser ? (
                    <>
                      <Search
                        name="Nom de l'utilisateur"
                        list={users.map((u) => u.firstName + " " + u.lastName)}
                        placeholder="Chercher un utilisateur..."
                        titleStyle={styles.inputTitle}
                        inputStyle={{
                          ...styles.input,
                          color: Colors.background,
                          placeholderTextColor: Colors.background,
                        }}
                        value={userName}
                        onChangeText={(text) => {
                          setUserName(text);
                          const user =
                            users.find(
                              (u) => u.firstName + " " + u.lastName === text
                            ) || "";
                          if (user) {
                            (
                              Object.keys(
                                recommandation
                              ) as (keyof Recommandation)[]
                            ).forEach((key) => {
                              if (key in user && key !== "companyId") {
                                handleChange(key, user[key as keyof User]);
                              }
                            });
                          }
                        }}
                        valid={internUser && isDataValid}
                      />
                    </>
                  ) : (
                    <>
                      <PersonalInformations
                        recommandation={recommandation}
                        handleChange={handleChange}
                        isDataValid={isDataValid}
                      />
                      <AddressInputs
                        data={recommandation}
                        handleChange={handleChange}
                        isDataValid={isDataValid}
                      />
                    </>
                  )}
                </>
              ) : (
                <Input
                  name="Nom du projet"
                  placeholder="Développement d'une application mobile"
                  type="off"
                  titleStyle={styles.inputTitle}
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                  }}
                  value={project.name}
                  onChangeText={(text) => handleChange("name", text || "")}
                  valid={isDataValid}
                />
              )}
              <DetailsInput
                type={type}
                recommandation={recommandation}
                project={project}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
              {type !== "company" && (
                <PriorityStars starId={starId} setStarId={setStarId} />
              )}
            </View>
            <View style={{ alignSelf: "center" }}>
              <Pressable
                onPress={() => {
                  const data = type === "project" ? project : recommandation;
                  let valid: boolean;
                  if ("addressComplement" in data) {
                    const { addressComplement, ...rest } = data;
                    valid = useFormValidation(rest);
                  } else {
                    valid = useFormValidation(data);
                  }
                  setIsDataValid(valid);
                  if (valid) {
                    type === "project"
                      ? sendProjectData()
                      : sendRecommendationData();
                    resetForm();
                    router.back();
                  }
                }}
                style={styles.validationButton}
              >
                <Text style={styles.buttonText}>
                  {titles.find((title) => title.label === type)?.sendText}
                </Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
