import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { AppContext } from "@/context/context";
import useFormValidation from "@/hooks/useFormValidation";
import { User } from "@/types";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import styles from "./style";

interface Page7Props {
  user: User;
  isDataValid: boolean;
  setIsDataValid: (isValid: boolean) => void;
}

export default function Page7({
  user,
  isDataValid,
  setIsDataValid,
}: Page7Props) {
  const { API_URL } = useContext(AppContext);
  const router = useRouter();
  const sendUserData = async (user: User) => {
    axios.post(`${API_URL}/users`, user).catch((error) => {
      console.error("Error sending user data:", error.response);
    });
  };
  return (
    <View style={styles.formPage}>
      <Input
        name="Décrivez votre activité en quelques mots."
        placeholder=""
        type="off"
        multiline={true}
      />
      <CheckBoxList
        title="Quelles sont les assurances et certifications en votre possession ?"
        choices={[
          <Text style={styles.checkboxText}>Responsabilité civile</Text>,
          <Text style={styles.checkboxText}>Décenale</Text>,
          <Text style={styles.checkboxText}>Autres</Text>,
        ]}
      />
      <Link
        style={styles.validationButton}
        asChild
        onPress={() => {
          setIsDataValid(useFormValidation(user));
          if (isDataValid) {
            sendUserData(user);
            router.dismissAll();
          }
        }}
        href="/legal/legalNotice"
      >
        <Text>Valider</Text>
      </Link>
    </View>
  );
}
