import { RecommendationFormTitles } from "@/app/(tabs)/recommendation/form";
import { AppContext } from "@/context/context";
import { Project, Recommandation } from "@/types";
import validateFormData from "@/utils/validateFormData";
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

  const validateForm = () => {
    const data = type === "project" ? project : recommandation;
    const valid = validateFormData(data);
    setIsDataValid(valid);
    if (valid) {
      if (type === "project") {
        sendProjectData();
      } else {
        sendRecommendationData();
      }
      resetForm();
      router.back();
    }
  };

  const sendRecommendationData = async () => {
    axios
      .post(`${API_URL}/recommandation`, {
        ...recommandation,
        startDate: new Date(),
        updatedAt: new Date(),
        retentionDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ).toISOString(),
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
        updatedAt: new Date(),
        retentionDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ).toISOString(),
      })
      .catch((error) => {
        console.error("Error sending project:", error);
      });
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <Pressable onPress={validateForm} style={styles.validationButton}>
        <Text style={styles.buttonText}>
          {titles.find((title) => title.label === type)?.sendText}
        </Text>
      </Pressable>
    </View>
  );
}
