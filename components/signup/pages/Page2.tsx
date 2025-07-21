import Input from "@/components/form/Input";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Company, User } from "@/types";
import { Platform, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page2Props {
  type: "company" | "guest";
  user: User;
  company: Company;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid: boolean | null;
}

export default function Page2({
  type,
  user,
  company,
  handleChangeUser,
  handleChangeCompany,
  isDataValid = null,
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
        <>
          <Input
            name="Nom de l'entreprise"
            placeholder="Google"
            type="organization"
            value={company.name}
            onChangeText={(text) => handleChangeCompany("name", text)}
            valid={isDataValid}
          />
          <Input
            name="Email de l'entreprise"
            placeholder="exemple@gmail.com"
            type="email"
            value={company.email}
            onChangeText={(text) => handleChangeCompany("email", text)}
            valid={isDataValid}
          />
        </>
      )}
    </View>
  );
}
