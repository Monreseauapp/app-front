import Input from "@/components/form/Input";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import styles from "./JobInformations.styles";

interface JobInformationsProps {
  user: User;
  handleChange: (
    field: keyof User | keyof Company,
    value: string | number | boolean | undefined
  ) => void;
}

export default function JobInformations({
  user,
  handleChange,
}: JobInformationsProps) {
  return (
    <>
      <Input
        name="Emploi"
        placeholder="Entrez votre emploi"
        type="off"
        value={user.jobTitle ?? ""}
        onChangeText={(text) => handleChange("jobTitle", text)}
        inputStyle={styles.input}
        titleStyle={styles.inputTitle}
      />
      <JobDomainSelect
        data={user}
        style={{ ...styles.select, pickerTextColor: Colors.black }}
        titleStyle={styles.inputTitle}
        handleChange={(key, value) => handleChange(key as keyof User, value)}
        domainIdKey="domainId"
      />
    </>
  );
}
