import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import useFormValidation from "@/hooks/useFormValidation";
import { Company, User } from "@/types";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./pages.styles";

interface Page7Props {
  user: User;
  company: Company;
  isDataValid: boolean | undefined;
  setIsDataValid: (isValid: boolean) => void;
  resetForm: () => void;
}

export default function Page7({
  user,
  company,
  setIsDataValid,
  isDataValid = undefined,
  resetForm,
}: Page7Props) {
  const { API_URL } = useContext(AppContext);
  const router = useRouter();
  const sendData = async (user: User, company: Company) => {
    await axios.post(`${API_URL}/users`, user).catch((error) => {
      console.error("Error sending user data:", error.response);
    });
    const userId = await axios
      .get(`${API_URL}/users/email/${user.email}`)
      .then((response) => response.data.id)
      .catch((error) => {
        console.error("Error fetching user ID:", error.response);
        return null;
      });
    axios
      .post(`${API_URL}/company`, { ...company, ownerId: userId })
      .catch((error) => {
        console.error("Error sending company data:", error.response);
      });
    const companyId = await axios
      .get(`${API_URL}/company/${company.name}`)
      .then((response) => response.data.id)
      .catch((error) => {
        console.error("Error fetching company ID:", error.response);
        return null;
      });
    axios.patch(`${API_URL}/users/${userId}`, {
      companyId: companyId,
    });
  };
  return (
    <View style={styles.formPage}>
      <Input
        name="Décrivez votre activité en quelques mots."
        placeholder=""
        type="off"
        multiline={true}
        valid={isDataValid}
      />
      <CheckBoxList
        title="Quelles sont les assurances et certifications en votre possession ?"
        choices={[
          <Text style={styles.checkboxText}>Responsabilité civile</Text>,
          <Text style={styles.checkboxText}>Décenale</Text>,
          <Text style={styles.checkboxText}>Autres</Text>,
        ]}
      />
      <Pressable
        style={styles.validationButton}
        onPress={() => {
          const isValid = useFormValidation(user) && useFormValidation(company);
          setIsDataValid(isValid);
          if (isValid) {
            resetForm();
            sendData(user, company);
            router.dismissAll();
            router.push("/signin/doubleAuth");
          }
        }}
      >
        <Text style={styles.validationText}>Valider</Text>
      </Pressable>
    </View>
  );
}
