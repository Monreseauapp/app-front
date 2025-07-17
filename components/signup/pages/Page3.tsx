import { createUserResponse } from "@/app/(auth)/signup/form";
import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { User } from "@/types";
import validateFormData from "@/utils/validateFormData";
import axios from "axios";
import { useContext } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page3Props {
  type: "company" | "guest";
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | undefined;
  setIsDataValid: (isValid: boolean) => void;
  resetForm: () => void;
  setResponse: (response: createUserResponse) => void;
}

export default function Page3({
  type,
  user,
  handleChangeUser,
  isDataValid = undefined,
  setIsDataValid,
  resetForm,
  setResponse,
}: Page3Props) {
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
        console.error("Error sending user data:", error.response);
      });
    setResponse(resp);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        justifyContent: "space-between",
        alignSelf: "center",
      }}
    >
      {type === "guest" && (
        <Input
          name="Téléphone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
          value={user.phone}
          onChangeText={(text) => handleChangeUser("phone", text.trim())}
          valid={isDataValid}
        />
      )}
      <Text
        style={{
          ...Platform.select({ web: webStyles.title, default: styles.title }),
          width: "100%",
          textAlign: "center",
        }}
      >
        Adresse personelle
      </Text>
      <AddressInputs
        data={user}
        handleChange={handleChangeUser}
        isDataValid={isDataValid}
        inputColor={Colors.violet}
        titleColor={Colors.white}
        placeholderColor={Colors.violet}
      />
      {type === "guest" && (
        <View style={{ width: "100%", alignItems: "center" }}>
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
