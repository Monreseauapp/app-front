import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import { Text, View } from "react-native";
import styles from "./style";

export default function Page6() {
  return (
    <View style={styles.formPage}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Input
          name="Avez vous déjà utilisé une application similaire ?"
          placeholder="Expliquez-nous en quelques mots votre expérience."
          type="off"
          multiline={true}
        />
      </View>
      <CheckBoxList
        title="Quels sont vos clients cibles : (choix multiple)"
        choices={[
          <Text style={styles.checkboxText}>Les particuliers</Text>,
          <Text style={styles.checkboxText}>Les indépendants/TPE</Text>,
          <Text style={styles.checkboxText}>Les PME et grands comptes</Text>,
        ]}
      />
    </View>
  );
}
