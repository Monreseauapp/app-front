import AddressInputs from "@/components/AddressInputs";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import { Platform } from "react-native";
import styles from "./PersonalInformations.styles";

interface PersonalInformationsProps {
  user: User;
  company: Company;
  isCompanyPage: boolean;
  handleChange: (
    type: "user" | "company",
    field: keyof User | keyof Company,
    value: string | number | undefined
  ) => void;
}

export default function PersonalInformations({
  user,
  company,
  isCompanyPage,
  handleChange,
}: PersonalInformationsProps) {
  return (
    <>
      <Input
        name="Email"
        placeholder="Entrez votre email"
        type="email"
        value={isCompanyPage ? company.email : user.email}
        onChangeText={(text) =>
          handleChange(isCompanyPage ? "company" : "user", "email", text)
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
          handleChange(isCompanyPage ? "company" : "user", "phone", text)
        }
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
      <AddressInputs
        data={isCompanyPage ? company : user}
        handleChange={(field, value) =>
          handleChange(
            isCompanyPage ? "company" : "user",
            field as keyof User | keyof Company,
            value
          )
        }
      />
      {!isCompanyPage && (
        <Input
          name="Password"
          placeholder="Entrez votre mot de passe"
          type="new-password"
          value={user.password}
          onChangeText={(text) =>
            handleChange(isCompanyPage ? "company" : "user", "password", text)
          }
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
