import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import { Company, SubscriptionType, User } from "@/types";
import validateFormData from "@/utils/validateFormData";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page7Props {
  user: User;
  company: Company;
  subscriptionType?: SubscriptionType;
  isDataValid: boolean | undefined;
  setIsDataValid: (isValid: boolean) => void;
  resetForm: () => void;
}

export default function Page7({
  user,
  company,
  subscriptionType,
  setIsDataValid,
  isDataValid = undefined,
  resetForm,
}: Page7Props) {
  const { API_URL } = useContext(AppContext);
  const router = useRouter();

  const validateForm = () => {
    const isValid = validateFormData(user) && validateFormData(company);
    setIsDataValid(isValid);
    if (isValid) {
      resetForm();
      sendData(user, company);
      router.dismissAll();
      router.push("/signin/doubleAuth");
    }
  };
  const sendData = async (user: User, company: Company) => {
    const userId = await axios
      .post(`${API_URL}/users`, user)
      .then((response) => response.data.id)
      .catch((error) => {
        console.error("Error sending user data:", error.response);
      });
    const companyId = await axios
      .post(`${API_URL}/company`, { ...company, ownerId: userId })
      .then((response) => response.data.id)
      .catch((error) => {
        console.error("Error sending company data:", error.response);
      });
    await axios.patch(`${API_URL}/users/${userId}`, {
      companyId: companyId,
    });
  };
  return (
    <View
      style={Platform.select({
        web: webStyles.formPage,
        default: styles.formPage,
      })}
    >
      <Input
        name="Décrivez votre activité en quelques mots."
        placeholder=""
        type="off"
        multiline={true}
        // valid={isDataValid}
      />
      <CheckBoxList
        title="Quelles sont les assurances et certifications en votre possession ?"
        choices={[
          <Text key="civil" style={styles.checkboxText}>
            Responsabilité civile
          </Text>,
          <Text key="decennial" style={styles.checkboxText}>
            Décenale
          </Text>,
          <Text key="others" style={styles.checkboxText}>
            Autres
          </Text>,
        ]}
      />
      <Pressable style={styles.validationButton} onPress={validateForm}>
        <Text style={styles.validationText}>Valider</Text>
      </Pressable>
    </View>
  );
}
