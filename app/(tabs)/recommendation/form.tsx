import BackIcon from "@/assets/icons/back.svg";
import Input from "@/components/form/Input";
import Search from "@/components/form/Search";
import AdressInputs from "@/components/recommendation/AdressInputs";
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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type RecommendationFormParams = {
  type: "company" | "lead" | "project";
};

type RecommendationFormTitles = {
  label: RecommendationFormParams["type"];
  title: string;
  sendText: string;
};

export default function RecommendationForm() {
  const { API_URL, userId } = useContext(AppContext);
  const router = useRouter();
  const { type } = useLocalSearchParams<RecommendationFormParams>();
  const titles: RecommendationFormTitles[] = [
    {
      label: "company",
      title: "JE RECOMMANDE UNE ENTREPRISE",
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
  const [intern, setIntern] = useState<boolean>(false);
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
    setIntern(false);
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
        setUsers(resp);
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
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 160,
            }}
            keyboardShouldPersistTaps="always"
          >
            <Text style={styles.title}>
              {titles.find((title) => title.label === type)?.title}
            </Text>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              {type !== "lead" && (
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
              )}
              {type !== "project" ? (
                <>
                  <PersonTypeSelector intern={intern} setIntern={setIntern} />
                  {intern ? (
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
                              if (key in user) {
                                handleChange(key, user[key as keyof User]);
                              }
                            });
                          }
                        }}
                        valid={intern && isDataValid}
                      />
                    </>
                  ) : (
                    <>
                      <PersonalInformations
                        recommandation={recommandation}
                        handleChange={handleChange}
                        isDataValid={isDataValid}
                      />
                      <AdressInputs
                        recommandation={recommandation}
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
            </View>
            {type !== "company" && (
              <PriorityStars starId={starId} setStarId={setStarId} />
            )}
            <View style={{ alignSelf: "center" }}>
              <Pressable
                onPress={() => {
                  const valid = useFormValidation(
                    type === "project" ? project : recommandation
                  );
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
          </ScrollView>
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
  title: {
    width: "90%",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
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
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.background,
    color: Colors.text,
  },
  validationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 18,
  },
});
