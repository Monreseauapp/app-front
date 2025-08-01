import { createUserResponse } from "@/app/(auth)/signup/form";
import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, SubscriptionType, User } from "@/types";
import validateFormData from "@/utils/validateFormData";
import axios from "axios";
import { useContext } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page2Props {
  type: "company" | "guest";
  user: User;
  company: Company;
  subscriptionType?: SubscriptionType;
  subscriptionTypesTranslation: Record<string, string>;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | boolean | undefined
  ) => void;
  resetForm: () => void;
  setResponse: (response: createUserResponse) => void;
  setIsDataValid: (isValid: boolean) => void;
  setSubscriptionType: (value: SubscriptionType) => void;
  isDataValid: boolean | null;
}

export default function Page2({
  type,
  user,
  company,
  subscriptionType,
  subscriptionTypesTranslation,
  handleChangeUser,
  handleChangeCompany,
  resetForm,
  setResponse,
  setIsDataValid,
  setSubscriptionType,
  isDataValid = null,
}: Page2Props) {
  const { API_URL } = useContext(AppContext);

  const validateForm = () => {
    const isValid = validateFormData(user);
    setIsDataValid(isValid);
    if (isValid) {
      resetForm();
      sendData();
    }
  };
  const sendData = async () => {
    const resp = await axios
      .post(`${API_URL}/users`, {
        ...user,
        updatedAt: new Date(),
        retentionDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 3)
        ).toISOString(),
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error sending user data:", error.request);
      });
    setResponse(resp);
  };

  return (
    <View
      style={Platform.select({
        web: webStyles.formPage,
        default: styles.formPage,
      })}
    >
      {type === "company" && (
        <>
          <Input
            name="Nom de l'entreprise"
            placeholder="Google"
            type="organization"
            value={company.name}
            onChangeText={(text) => handleChangeCompany("name", text)}
            valid={isDataValid}
          />
          <Input
            name="SIRET"
            placeholder="123 456 789 00010"
            type="off"
            offType="number"
            limit={14}
            value={company.SIRET}
            onChangeText={(text) => handleChangeCompany("SIRET", text)}
            valid={isDataValid}
          />
          <Input
            name="SIREN"
            placeholder="123 456 789"
            type="off"
            offType="number"
            limit={9}
            value={company.SIREN}
            onChangeText={(text) => handleChangeCompany("SIREN", text)}
            valid={isDataValid}
          />
          <Select
            title="Vous êtes..."
            choices={Object.keys(subscriptionTypesTranslation)}
            selected={Object.keys(subscriptionTypesTranslation).find(
              (key) => subscriptionTypesTranslation[key] === subscriptionType
            )}
            setSelected={(value) => {
              setSubscriptionType(
                subscriptionTypesTranslation[value] as SubscriptionType
              );
            }}
            valid={isDataValid}
          />
          <JobDomainSelect
            data={company}
            handleChange={(key, value) =>
              handleChangeCompany(key as keyof Company, value)
            }
            domainIdKey={"domainId"}
            valid={isDataValid}
          />
        </>
      )}
      <AddressInputs
        data={user}
        handleChange={(field, value) => {
          handleChangeUser(field, value);
          handleChangeCompany(field as keyof Company, value);
        }}
        isDataValid={isDataValid}
        inputColor={Colors.violet}
        titleColor={Colors.white}
      />
      <Input
        name="Téléphone professionnel"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        limit={13}
        value={company.phone}
        onChangeText={(text) => {
          handleChangeUser("phone", text.trim());
          handleChangeCompany("phone", text.trim());
        }}
        valid={isDataValid}
      />

      {type === "guest" && (
        <View style={{ width: "100%", alignItems: "center" }}>
          {isDataValid === false && (
            <Text style={styles.errorText}>
              Veuillez remplir tous les champs requis.
            </Text>
          )}
          <Pressable style={styles.button} onPress={validateForm}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.white,
              }}
            >
              Valider
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
