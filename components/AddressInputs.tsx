import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import Input from "./form/Input";

interface AddressFields {
  address: string;
  addressComplement?: string | null;
  city: string;
  postalCode?: string | number;
  country?: string;
  [key: string]: any;
}

interface PersonalInformationsProps<T extends AddressFields> {
  data: T;
  handleChange: (field: keyof T, value: string | number | undefined) => void;
  isDataValid?: boolean;
}

export default function AddressInputs<T extends AddressFields>({
  data,
  handleChange,
  isDataValid = undefined,
}: PersonalInformationsProps<T>) {
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
        value={data.address}
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
        value={data.addressComplement ?? ""}
        onChangeText={(text) => handleChange("addressComplement", text)}
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
        value={data.city}
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
        value={data.postalCode?.toString()}
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
        value={data.country}
        onChangeText={(text) => handleChange("country", text)}
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
