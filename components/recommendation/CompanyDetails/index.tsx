import Input from "@/components/form/Input";
import JobDomainSelect from "@/components/JobDomainSelect";
import { Colors } from "@/constants/Colors";
import { Project, Recommandation } from "@/types";
import { View } from "react-native";
import styles from "./CompanyDetails.styles";

interface CompanyDetailsProps {
  data: Recommandation | Project;
  handleChange: (
    field: keyof Recommandation | keyof Project,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid?: boolean;
}

export default function CompanyDetails({
  data,
  handleChange,
  isDataValid,
}: CompanyDetailsProps) {
  return (
    <>
      <Input
        name="Nom de l'entreprise"
        placeholder="Google"
        type="organization"
        titleStyle={styles.inputTitle}
        inputStyle={{ ...styles.input, placeholderTextColor: Colors.grey }}
        value={data.companyName || ""}
        onChangeText={(text) => handleChange("companyName", text)}
        valid={isDataValid}
      />
      <Input
        name="Numéro de téléphone"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        titleStyle={styles.inputTitle}
        inputStyle={{ ...styles.input, placeholderTextColor: Colors.grey }}
        value={data.companyPhone || ""}
        onChangeText={(text) => handleChange("companyPhone", text)}
        valid={isDataValid}
      />
      <Input
        name="Adresse e-mail"
        placeholder="exemple@gmail.com"
        type="email"
        titleStyle={styles.inputTitle}
        inputStyle={{ ...styles.input, placeholderTextColor: Colors.grey }}
        value={data.companyEmail || ""}
        onChangeText={(text) => handleChange("companyEmail", text)}
        valid={isDataValid}
      />
      <JobDomainSelect
        data={data}
        style={{ ...styles.select, pickerTextColor: Colors.text }}
        titleStyle={styles.inputTitle}
        handleChange={(key, value) =>
          handleChange(key as keyof Recommandation | keyof Project, value)
        }
        domainIdKey="companyDomainId"
        valid={isDataValid}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Input
          name="Adresse ligne 1"
          placeholder="18 avenue des Champs-Élysées"
          type="address-line1"
          sameLine={2}
          titleStyle={{ color: Colors.text }}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
            color: Colors.accent,
          }}
          value={data.companyAddress || ""}
          onChangeText={(text) => handleChange("companyAddress", text)}
        />
        <Input
          name="Adresse ligne 2"
          placeholder="Apt 42"
          type="address-line2"
          sameLine={2}
          titleStyle={{ color: Colors.text }}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
            alignSelf: "flex-end",
            color: Colors.accent,
          }}
          value={data.companyAddressComplement ?? ""}
          onChangeText={(text) =>
            handleChange("companyAddressComplement", text)
          }
        />
        <Input
          name="Ville"
          placeholder="Paris"
          type="off"
          sameLine={2}
          titleStyle={{ color: Colors.text }}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
            color: Colors.accent,
          }}
          value={data.companyCity || ""}
          onChangeText={(text) => handleChange("companyCity", text)}
          valid={isDataValid}
        />
        <Input
          name="Code postal"
          placeholder="75000"
          type="postal-code"
          sameLine={2}
          titleStyle={{ color: Colors.text }}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
            alignSelf: "flex-end",
            color: Colors.accent,
          }}
          value={data.companyPostalCode?.toString()}
          onChangeText={(text) =>
            handleChange(
              "companyPostalCode",
              Number(text.replace(/\D/g, "")) || undefined
            )
          }
        />
      </View>
    </>
  );
}
