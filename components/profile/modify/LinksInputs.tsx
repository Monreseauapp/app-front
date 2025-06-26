import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import { StyleSheet } from "react-native";

interface LinksInputsProps {
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

export default function LinksInputs({
  user,
  company,
  isCompanyPage,
  handleChangeUser,
  handleChangeCompany,
}: LinksInputsProps) {
  return (
    <>
      {!isCompanyPage && (
        <>
          <Input
            name="Youtube"
            placeholder="Entrez votre lien Youtube"
            type="off"
            value={user.youtube ?? ""}
            onChangeText={(text) => handleChangeUser("youtube", text)}
            inputStyle={{
              ...styles.input,
              placeholderTextColor: Colors.grey,
            }}
            titleStyle={styles.inputTitle}
          />
          <Input
            name="Instagram"
            placeholder="Entrez votre lien Instagram"
            type="off"
            value={user.instagram ?? ""}
            onChangeText={(text) => handleChangeUser("instagram", text)}
            inputStyle={{
              ...styles.input,
              placeholderTextColor: Colors.grey,
            }}
            titleStyle={styles.inputTitle}
          />
        </>
      )}

      <Input
        name="Linkedin"
        placeholder="Entrez votre lien Linkedin"
        type="off"
        value={(isCompanyPage ? company.linkedin : user.linkedin) ?? ""}
        onChangeText={(text) =>
          isCompanyPage
            ? handleChangeCompany("linkedin", text)
            : handleChangeUser("linkedin", text)
        }
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
      <Input
        name="Site web"
        placeholder="Entrez le lien de votre site web"
        type="off"
        value={(isCompanyPage ? company.website : user.website) ?? ""}
        onChangeText={(text) =>
          isCompanyPage
            ? handleChangeCompany("website", text)
            : handleChangeUser("website", text)
        }
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
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
