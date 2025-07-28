import { createUserResponse } from "@/app/(auth)/signup/form";
import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import { Company, SubscriptionState, SubscriptionType, User } from "@/types";
import validateFormData from "@/utils/validateFormData";
import axios from "axios";
import { useContext } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page7Props {
  user: User;
  company: Company;
  subscriptionType?: SubscriptionType;
  isDataValid: boolean | null;
  setIsDataValid: (isValid: boolean) => void;
  setResponse: (response: createUserResponse) => void;
}

export default function Page7({
  user,
  company,
  subscriptionType,
  setIsDataValid,
  isDataValid = null,
  setResponse,
}: Page7Props) {
  const { API_URL } = useContext(AppContext);

  const validateForm = () => {
    const isValid = validateFormData(user) && validateFormData(company);
    setIsDataValid(isValid);
    if (isValid) {
      sendData(user, company);
    }
  };
  const sendData = async (user: User, company: Company) => {
    if (!subscriptionType) {
      console.error("Subscription type is not selected.");
      return;
    }
    const response = await axios
      .post(`${API_URL}/users`, {
        ...user,
        updatedAt: new Date(),
        retentionDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ).toISOString(),
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error sending user data:", error.response);
      });
    setResponse(response);
    const companyId = await axios
      .post(`${API_URL}/company`, {
        ...company,
        ownerId: response.id,
        updatedAt: new Date(),
        retentionDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ).toISOString(),
      })
      .then((response) => response.data.id)
      .catch((error) => {
        console.error("Error sending company data:", error.response);
      });
    const subscription = await axios
      .post(`${API_URL}/subscription`, {
        duration: 1,
        type: subscriptionType,
        state: SubscriptionState.SUSPENDED,
        companyId: companyId,
        updatedAt: new Date(),
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error creating subscription:", error.response);
      });
    await axios.patch(`${API_URL}/users/${response.id}`, {
      companyId: companyId,
    });
    await axios.patch(`${API_URL}/company/${companyId}`, {
      subscriptionId: subscription.id,
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
      {isDataValid === false && (
        <Text style={styles.errorText}>
          Veuillez remplir tous les champs requis.
        </Text>
      )}
      <Pressable style={styles.validationButton} onPress={validateForm}>
        <Text style={styles.validationText}>Valider</Text>
      </Pressable>
    </View>
  );
}
