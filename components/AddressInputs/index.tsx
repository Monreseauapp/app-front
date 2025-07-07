import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import Input from "../form/Input";
import styles from "./AddressInputs.styles";

interface AddressFields {
  address: string;
  addressComplement?: string | null;
  city: string;
  postalCode?: string | number;
  country?: string;
  [key: string]: any;
}

interface AdressInputsProps<T extends AddressFields> {
  data: T;
  handleChange: (
    field: keyof T,
    value: string | number | boolean | undefined
  ) => void;
  isDataValid?: boolean;
  titleColor?: string;
  inputColor?: string;
  placeholderColor?: string;
}

export default function AddressInputs<T extends AddressFields>({
  data,
  handleChange,
  isDataValid = undefined,
  titleColor = Colors.text,
  inputColor = Colors.text,
  placeholderColor = Colors.grey,
}: AdressInputsProps<T>) {
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
        titleStyle={{ color: titleColor }}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: placeholderColor,
          color: inputColor,
        }}
        value={data.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <Input
        name="Adresse ligne 2"
        placeholder="Apt 42"
        type="address-line2"
        sameLine={2}
        titleStyle={{ color: titleColor }}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: placeholderColor,
          alignSelf: "flex-end",
          color: inputColor,
        }}
        value={data.addressComplement ?? ""}
        onChangeText={(text) => handleChange("addressComplement", text)}
      />
      <Input
        name="Ville"
        placeholder="Paris"
        type="off"
        sameLine={2}
        titleStyle={{ color: titleColor }}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: placeholderColor,
          color: inputColor,
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
        titleStyle={{ color: titleColor }}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: placeholderColor,
          alignSelf: "flex-end",
          color: inputColor,
        }}
        value={data.postalCode?.toString()}
        onChangeText={(text) =>
          handleChange(
            "postalCode",
            Number(text.replace(/\D/g, "")) || undefined
          )
        }
      />
      <Input
        name="Pays"
        placeholder="France"
        type="country"
        titleStyle={{ color: titleColor }}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: placeholderColor,
          color: inputColor,
        }}
        value={data.country}
        onChangeText={(text) => handleChange("country", text)}
      />
    </View>
  );
}
