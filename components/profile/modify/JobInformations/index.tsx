import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import styles from "./JobInformations.styles";

interface JobInformationsProps {
  user: User;
  jobDomains: { id: string; domaine: string }[];
  handleChange: (
    field: keyof User | keyof Company,
    value: string | number | undefined
  ) => void;
}

export default function JobInformations({
  user,
  jobDomains,
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
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        titleStyle={styles.inputTitle}
      />
      <Select
        title="Domaine d'activité"
        choices={jobDomains?.map((domain) => domain.domaine)}
        selected={
          jobDomains.find((domain) => domain.id === user.domainId)?.domaine ||
          ""
        }
        setSelected={(value) => {
          const selectedDomain = jobDomains.find(
            (domain) => domain.domaine === value
          );
          if (selectedDomain) {
            handleChange("domainId", selectedDomain.id);
          }
        }}
        titleStyle={styles.inputTitle}
        selectStyle={{
          backgroundColor: Colors.background,
          pickerTextColor: Colors.text,
        }}
      />
    </>
  );
}
