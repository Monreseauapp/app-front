import Input from "@/components/form/Input";
import { Company, User } from "@/types";
import styles from "./LinksInputs.styles";

interface LinksInputsProps {
  user: User;
  company: Company;
  isCompanyPage: boolean;
  handleChange: (
    type: "user" | "company",
    field: keyof User | keyof Company,
    value: string | number | boolean | undefined
  ) => void;
}

export default function LinksInputs({
  user,
  company,
  isCompanyPage,
  handleChange,
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
            onChangeText={(text) => handleChange("user", "youtube", text)}
            inputStyle={styles.input}
            titleStyle={styles.inputTitle}
          />
          <Input
            name="Instagram"
            placeholder="Entrez votre lien Instagram"
            type="off"
            value={user.instagram ?? ""}
            onChangeText={(text) => handleChange("user", "instagram", text)}
            inputStyle={styles.input}
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
          handleChange(isCompanyPage ? "company" : "user", "linkedin", text)
        }
        inputStyle={styles.input}
        titleStyle={styles.inputTitle}
      />
      <Input
        name="Site web"
        placeholder="Entrez le lien de votre site web"
        type="off"
        value={(isCompanyPage ? company.website : user.website) ?? ""}
        onChangeText={(text) =>
          handleChange(isCompanyPage ? "company" : "user", "website", text)
        }
        inputStyle={styles.input}
        titleStyle={styles.inputTitle}
      />
    </>
  );
}
