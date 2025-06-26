import Input from "@/components/form/Input";
import { Company, User } from "@/types";
import { Text, View } from "react-native";
import styles from "./style";

interface Page4Props {
  company: Company;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | undefined
  ) => void;
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
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
      <Text style={{ ...styles.title, width: "100%", textAlign: "center" }}>
        Informations professionnelles (adresse de l'entreprise)
      </Text>
      <Input
        name="Adresse ligne 1"
        placeholder="18 avenue des Champs-Élysées"
        type="address-line1"
        sameLine={2}
        value={company.address}
        onChangeText={(text) => handleChangeCompany("address", text)}
        valid={isDataValid}
      />
      <Input
        name="Adresse ligne 2"
        placeholder="Apt 42"
        type="address-line2"
        sameLine={2}
        inputStyle={{ alignSelf: "flex-end" }}
        value={company.addressComplement}
        onChangeText={(text) => handleChangeCompany("addressComplement", text)}
        valid={isDataValid}
      />
      <Input
        name="Ville"
        placeholder="Paris"
        type="off"
        sameLine={2}
        value={company.city}
        onChangeText={(text) => handleChangeCompany("city", text)}
        valid={isDataValid}
      />
      <Input
        name="Code postal"
        placeholder="75000"
        type="postal-code"
        sameLine={2}
        inputStyle={{ alignSelf: "flex-end" }}
        value={company.postalCode?.toString() || ""}
        onChangeText={(text) =>
          handleChangeCompany(
            "postalCode",
            Number(text.replace(/\D/g, "")) || undefined
          )
        }
        valid={isDataValid}
      />
      <Input
        name="Pays"
        placeholder="France"
        type="country"
        value={company.country}
        onChangeText={(text) => handleChangeCompany("country", text)}
        valid={isDataValid}
      />
      <Input
        name="Téléphone professionnel"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        value={company.phone}
        onChangeText={(text) => {
          handleChangeUser("phone", text);
          handleChangeCompany("phone", text);
        }}
        valid={isDataValid}
      />
    </View>
  );
}
