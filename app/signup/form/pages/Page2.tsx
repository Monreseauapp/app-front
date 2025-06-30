import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { Company, User } from "@/types";
import { View } from "react-native";
import styles from "./pages.styles";

interface Page2Props {
  type: "company" | "guest";
  user: User;
  jobDomains: { id: string; domaine: string }[];
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | undefined
  ) => void;
  isDataValid: boolean | undefined;
}

export default function Page2({
  type,
  user,
  jobDomains,
  handleChangeUser,
  handleChangeCompany,
  isDataValid = undefined,
}: Page2Props) {
  return (
    <View style={styles.formPage}>
      <Select
        title="Domaine d'activité"
        choices={[
          "Sélectionner un domaine",
          ...jobDomains?.map((domain) => domain.domaine),
        ]}
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
        valid={isDataValid}
      />
      {type === "company" && (
        <Input
          name="Email de l'entreprise"
          placeholder="exemple@gmail.com"
          type="email"
          value={user.email}
          onChangeText={(text) => handleChangeCompany("email", text)}
          valid={isDataValid}
        />
      )}
    </View>
  );
}
