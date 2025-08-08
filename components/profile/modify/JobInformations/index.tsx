import Input from "@/components/form/Input";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import styles from "./JobInformations.styles";

interface JobInformationsProps {
  user: User;
  company: Company;
  handleChange: (
    field: keyof User | keyof Company,
    value: string | number | boolean | undefined
  ) => void;
  isCompanyPage?: boolean;
}

export default function JobInformations({
  user,
  company,
  handleChange,
  isCompanyPage,
}: JobInformationsProps) {
  return (
    <>
      {!isCompanyPage && (
        <Input
          name="Emploi"
          placeholder="Entrez votre emploi"
          type="off"
          value={user.jobTitle ?? ""}
          onChangeText={(text) => handleChange("jobTitle", text)}
          inputStyle={styles.input}
          titleStyle={styles.inputTitle}
        />
      )}
      {isCompanyPage && (
        <JobDomainSelect
          data={company}
          style={{ ...styles.select, pickerTextColor: Colors.black }}
          titleStyle={styles.inputTitle}
          handleChange={(key, value) =>
            handleChange(key as keyof Company, value)
          }
          domainIdKey="domainId"
        />
      )}
    </>
  );
}
