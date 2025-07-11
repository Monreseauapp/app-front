import CompanyInformations from "@/components/recommendation/CompanyInformations";
import CompanyNumber from "@/components/recommendation/CompanyNumber";
import DetailsInput from "@/components/recommendation/DetailsInput";
import PriorityStars from "@/components/recommendation/PriorityStars";
import UserInformations from "@/components/recommendation/UserInformations";
import ValidateForm from "@/components/recommendation/ValidateForm";
import { Colors } from "@/constants/Colors";
import { initialProject } from "@/constants/initial-types-value/initialProject";
import { initialRecommendation } from "@/constants/initial-types-value/initialRecommendation";
import { AppContext } from "@/context/context";
import { Company, Project, Recommandation, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./form.styles";

type RecommendationFormParams = {
  type: "company" | "lead" | "project";
};

export type RecommendationFormTitles = {
  label: RecommendationFormParams["type"];
  title: string;
  sendText: string;
};

export default function RecommendationForm() {
  const { width } = Dimensions.get("window");
  const { API_URL, userId } = useContext(AppContext);
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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
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
    setIsDataValid(undefined);
    setStarId(0);
  };

  const handleChange = (
    key: keyof Recommandation | keyof Project,
    value: any
  ) => {
    if (type === "project") {
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
          setCompanies(resp);
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
            backgroundColor: Colors.white,
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
              <CompanyNumber
                type={type}
                project={project}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
              {(!project.isPublic || type === "company") && (
                <CompanyInformations
                  type={type}
                  project={project}
                  recommandation={recommandation}
                  companies={companies}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  handleChange={handleChange}
                  isDataValid={isDataValid || project.isPublic}
                />
              )}
              <UserInformations
                type={type}
                recommandation={recommandation}
                project={project}
                users={users}
                userName={userName}
                setUserName={setUserName}
                handleChange={handleChange}
                isDataValid={isDataValid}
              />
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
            <ValidateForm
              type={type}
              titles={titles}
              project={project}
              recommandation={recommandation}
              setIsDataValid={setIsDataValid}
              resetForm={resetForm}
            />
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
