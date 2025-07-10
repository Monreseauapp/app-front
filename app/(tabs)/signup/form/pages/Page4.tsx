import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import { Platform, Text, View } from "react-native";
import styles, { webStyles } from "./pages.styles";

interface Page4Props {
  company: Company;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | boolean | undefined
  ) => void;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | undefined;
}

export default function Page4({
  company,
  handleChangeCompany,
  handleChangeUser,
  isDataValid = undefined,
}: Page4Props) {
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
      <Text
        style={{
          ...Platform.select({ web: webStyles.title, default: styles.title }),
          width: "100%",
          textAlign: "center",
        }}
      >
        Informations professionnelles (adresse de l'entreprise)
      </Text>
      <AddressInputs
        data={company}
        handleChange={handleChangeCompany}
        isDataValid={isDataValid}
        inputColor={Colors.violet}
        titleColor={Colors.white}
        placeholderColor={Colors.violet}
      />
      <Input
        name="Téléphone professionnel"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        value={company.phone}
        onChangeText={(text) => {
          handleChangeUser("phone", text.trim());
          handleChangeCompany("phone", text.trim());
        }}
        valid={isDataValid}
      />
    </View>
  );
}
