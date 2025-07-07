import Input from "@/components/form/Input";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Company, User } from "@/types";
import { Platform, View } from "react-native";
import styles, { webStyles } from "./pages.styles";

interface Page2Props {
  type: "company" | "guest";
  user: User;
  jobDomains: { id: string; domaine: string }[];
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | boolean | undefined
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
    <View
      style={Platform.select({
        web: webStyles.formPage,
        default: styles.formPage,
      })}
    >
      <JobDomainSelect
        data={user}
        handleChange={(key, value) =>
          handleChangeUser(key as keyof User, value)
        }
        domainIdKey={"domainId"}
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
