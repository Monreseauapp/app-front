import { createUserResponse } from "@/app/(auth)/signup/form";
import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import {
  Company,
  CompanyProfile,
  SubscriptionState,
  SubscriptionType,
  User,
} from "@/types";
import validateFormData from "@/utils/validateFormData";
import axios from "axios";
import { useContext } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page3Props {
  type: "company" | "guest";
  user: User;
  company: Company;
  companyProfile: CompanyProfile;
  subscriptionType?: SubscriptionType;
  handleChangeCompanyProfile: (
    field: keyof CompanyProfile,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | null;
  setIsDataValid: (isValid: boolean) => void;
  setResponse: (response: createUserResponse) => void;
}

export default function Page3({
  user,
  company,
  companyProfile,
  subscriptionType,
  isDataValid = null,
  handleChangeCompanyProfile,
  setIsDataValid,
  setResponse,
}: Page3Props) {
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
    await axios.post(`${API_URL}/company-profile`, {
      ...companyProfile,
      companyId: companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
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
        onChangeText={(value) =>
          handleChangeCompanyProfile("activityDescription", value)
        }
      />
      <CheckBoxList
        title="La raison de votre inscription (choix multiple)"
        choices={[
          <Text
            key={"visibility"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Pour gagner en <Text style={styles.span}>visibilité</Text>
          </Text>,
          <Text
            key={"recommendations"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Recevoir des <Text style={styles.span}>recommandations</Text>
          </Text>,
          <Text
            key={"network"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Développer votre <Text style={styles.span}>réseau</Text>
          </Text>,
        ]}
        data={companyProfile}
        field="registrationReason"
        onChange={(value) =>
          handleChangeCompanyProfile("registrationReason", value)
        }
      />
      <CheckBoxList
        title="Quels sont vos clients cibles : (choix multiple)"
        choices={[
          <Text key="individuals" style={styles.checkboxText}>
            Les particuliers
          </Text>,
          <Text key="vsb" style={styles.checkboxText}>
            Les indépendants/TPE
          </Text>,
          <Text key="business" style={styles.checkboxText}>
            Les PME et grands comptes
          </Text>,
        ]}
        data={companyProfile}
        field="targetClient"
        onChange={(value) => handleChangeCompanyProfile("targetClient", value)}
      />

      <Input
        name="Avez vous déjà utilisé une application similaire ?"
        placeholder="Expliquez-nous en quelques mots votre expérience."
        type="off"
        multiline={true}
        onChangeText={(value) =>
          handleChangeCompanyProfile("similarApplications", value)
        }
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
        data={companyProfile}
        field="certifications"
        onChange={(value) =>
          handleChangeCompanyProfile("certifications", value)
        }
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
