import { RecommendationFormTitles } from "@/app/(tabs)/recommendation/form";
import { AppContext } from "@/context/context";
import useFormValidation from "@/hooks/useFormValidation";
import { Project, Recommandation } from "@/types";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./ValidateForm.styles";

interface ValidateFormProps {
  type: "project" | "company" | "lead";
  titles: RecommendationFormTitles[];
  project: Project;
  recommandation: Recommandation;
  setIsDataValid: (isValid: boolean) => void;
  resetForm: () => void;
}

export default function ValidateForm({
  type,
  titles,
  project,
  recommandation,
  setIsDataValid,
  resetForm,
}: ValidateFormProps) {
  const router = useRouter();
  const { API_URL } = useContext(AppContext);

  const sendRecommendationData = async () => {
    axios
      .post(`${API_URL}/recommandation`, {
        ...recommandation,
        startDate: new Date(),
      })
      .catch((error) => {
        console.error("Error sending recommendation:", error);
      });
  };

  const sendProjectData = async () => {
    axios
      .post(`${API_URL}/project`, {
        ...project,
        startDate: new Date(),
      })
      .catch((error) => {
        console.error("Error sending project:", error);
      });
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <Pressable
        onPress={() => {
          const data = type === "project" ? project : recommandation;
          const valid = useFormValidation(data);
          console.log(data, valid);
          setIsDataValid(valid);
          if (valid) {
            type === "project" ? sendProjectData() : sendRecommendationData();
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
  );
}
