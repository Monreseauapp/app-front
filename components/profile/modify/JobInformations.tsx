import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { Colors } from "@/constants/Colors";
import { User } from "@/types";
import { StyleSheet } from "react-native";

interface JobInformationsProps {
  user: User;
  jobDomains: { id: string; domaine: string }[];
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
}

export default function JobInformations({
  user,
  jobDomains,
  handleChangeUser,
}: JobInformationsProps) {
  return (
    <>
      <Input
        name="Emploi"
        placeholder="Entrez votre emploi"
        type="off"
        value={user.jobTitle ?? ""}
        onChangeText={(text) => handleChangeUser("jobTitle", text)}
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
            handleChangeUser("domainId", selectedDomain.id);
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
