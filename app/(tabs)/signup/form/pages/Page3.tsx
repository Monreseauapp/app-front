import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { User } from "@/types";
import validateFormData from "@/utils/validateFormData";
import { useRouter } from "expo-router";
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
}

export default function Page3({
  type,
  user,
  handleChangeUser,
  isDataValid = undefined,
  setIsDataValid,
  resetForm,
}: Page3Props) {
  const router = useRouter();
  const validateForm = () => {
    const isValid = validateFormData(user);
    setIsDataValid(isValid);
    if (isValid) {
      resetForm();
      router.dismissAll();
      router.push("/legal/legalNotice");
    }
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
