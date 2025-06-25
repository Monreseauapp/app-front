import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import { Platform, StyleSheet } from "react-native";

interface PersonalInformationsProps {
  user: User;
  company: Company;
  isCompanyPage: boolean;
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | undefined
  ) => void;
}

export default function PersonalInformations({
  user,
  company,
  isCompanyPage,
  handleChangeUser,
  handleChangeCompany,
}: PersonalInformationsProps) {
  return (
    <>
      <Input
        name="Email"
        placeholder="Entrez votre email"
        type="email"
        value={isCompanyPage ? company.email : user.email}
        onChangeText={(text) =>
          isCompanyPage
            ? handleChangeCompany("email", text)
            : handleChangeUser("email", text)
        }
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
      <Input
        name="Téléphone"
        placeholder="Entrez votre numéro de téléphone"
        type={Platform.OS === "android" ? "tel-national" : "tel"}
        value={isCompanyPage ? company.phone : user.phone}
        onChangeText={(text) =>
          isCompanyPage
            ? handleChangeCompany("phone", text)
            : handleChangeUser("phone", text)
        }
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
      <AddressInputs
        data={isCompanyPage ? company : user}
        handleChange={isCompanyPage ? handleChangeCompany : handleChangeUser}
      />
      {!isCompanyPage && (
        <Input
          name="Password"
          placeholder="Entrez votre mot de passe"
          type="new-password"
          value={user.password}
          onChangeText={(text) => handleChangeUser("password", text)}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
          }}
          titleStyle={styles.inputTitle}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
});
