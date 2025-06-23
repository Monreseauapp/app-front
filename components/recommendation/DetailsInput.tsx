import { Colors } from "@/constants/Colors";
import { Project, Recommandation } from "@/types";
import { StyleSheet } from "react-native";
import Input from "../form/Input";

interface DetailsInputProps {
  type: "company" | "lead" | "project";
  recommandation: Recommandation;
  project: Project;
  handleChange: (key: keyof Recommandation | keyof Project, value: any) => void;
  isDataValid?: boolean;
}

export default function DetailsInput({
  type,
  recommandation,
  handleChange,
  project,
  isDataValid = undefined,
}: DetailsInputProps) {
  return (
    <>
      {type === "company" ? (
        <Input
          name="Détails sur l'entreprise recommandée"
          placeholder=""
          type="off"
          multiline={true}
          titleStyle={styles.inputTitle}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
          }}
          value={recommandation.description ?? ""}
          onChangeText={(text) => handleChange("description", text)}
          valid={isDataValid}
        />
      ) : (
        <Input
          name="Détails du besoin"
          placeholder=""
          type="off"
          multiline={true}
          titleStyle={styles.inputTitle}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
          }}
          value={
            (type === "project"
              ? project.description
              : recommandation.description) ?? ""
          }
          onChangeText={(text) => handleChange("description", text)}
          valid={isDataValid}
        />
      )}
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
