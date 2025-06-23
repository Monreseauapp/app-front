import { Colors } from "@/constants/Colors";
import { Recommandation } from "@/types";
import { StyleSheet, View } from "react-native";
import Input from "../form/Input";

interface PersonalInformationsProps {
  recommandation: Recommandation;
  handleChange: (
    field: keyof Recommandation,
    value: string | number | undefined
  ) => void;
  isDataValid?: boolean;
}

export default function AddressInputs({
  recommandation,
  handleChange,
  isDataValid = undefined,
}: PersonalInformationsProps) {
  return (
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
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        value={recommandation.address}
        onChangeText={(text) => handleChange("address", text)}
        valid={isDataValid}
      />
      <Input
        name="Adresse ligne 2"
        placeholder="Apt 42"
        type="address-line2"
        sameLine={2}
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
          alignSelf: "flex-end",
        }}
        valid={isDataValid}
      />
      <Input
        name="Ville"
        placeholder="Paris"
        type="off"
        sameLine={2}
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        value={recommandation.city}
        onChangeText={(text) => handleChange("city", text)}
        valid={isDataValid}
      />
      <Input
        name="Code postal"
        placeholder="75000"
        type="postal-code"
        sameLine={2}
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
          alignSelf: "flex-end",
        }}
        value={recommandation.postalCode?.toString()}
        onChangeText={(text) =>
          handleChange(
            "postalCode",
            Number(text.replace(/\D/g, "")) || undefined
          )
        }
        valid={isDataValid}
      />
      <Input
        name="Pays"
        placeholder="France"
        type="country"
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        valid={isDataValid}
      />
    </View>
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
