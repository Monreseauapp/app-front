import CustomCheckbox from "@/components/form/CustomCheckbox";
import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Project } from "@/types";
import { Text, View } from "react-native";
import { styles } from "./CompanyNumber.styles";

interface CompanyNumberProps {
  type: "project" | "company" | "lead";
  project: Project;
  handleChange: (
    key: keyof Project,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid?: boolean | null;
}

export default function CompanyNumber({
  type,
  project,
  handleChange,
  isDataValid = null,
}: CompanyNumberProps) {
  return (
    <>
      {type === "project" && (
        <>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>
              Voulez-vous que le projet soit public ?
            </Text>
            <CustomCheckbox
              checked={project.isPublic}
              onChange={(checked) => handleChange("isPublic", checked)}
              width={35}
              height={35}
              style={styles.checkbox}
              markerStyle={Colors.white}
            />
          </View>
          {project.isPublic && (
            <Input
              name="Nombre d'entreprises auxquelles vous voulez ouvrir le projet"
              placeholder="0"
              type="off"
              offType="number"
              titleStyle={styles.inputTitle}
              inputStyle={{
                ...styles.input,
                color: Colors.black,
              }}
              value={project.companyNumber?.toString()}
              onChangeText={(text) =>
                handleChange(
                  "companyNumber",
                  Number(text.replace(/\D/g, "")) || 0
                )
              }
            />
          )}
        </>
      )}
    </>
  );
}
