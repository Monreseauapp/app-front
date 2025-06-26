import Input from "@/components/form/Input";
import useFormValidation from "@/hooks/useFormValidation";
import { User } from "@/types";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./style";

interface Page3Props {
  type: "company" | "guest";
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
  isDataValid: boolean | undefined;
  setIsDataValid: (isValid: boolean) => void;
  resetForm: () => void;
}

export default function Page3({
  type,
  user,
  handleChangeUser,
  isDataValid = undefined,
  setIsDataValid,
  resetForm,
}: Page3Props) {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        justifyContent: "space-between",
        alignSelf: "center",
      }}
    >
      {type === "guest" && (
        <Input
          name="Téléphone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
          value={user.phone}
          onChangeText={(text) => handleChangeUser("phone", text)}
          valid={isDataValid}
        />
      )}
      <Text style={{ ...styles.title, width: "100%", textAlign: "center" }}>
        Adresse personelle
      </Text>
      <Input
        name="Adresse ligne 1"
        placeholder="18 avenue des Champs-Élysées"
        type="address-line1"
        sameLine={2}
        value={user.address}
        onChangeText={(text) => handleChangeUser("address", text)}
        valid={isDataValid}
      />
      <Input
        name="Adresse ligne 2"
        placeholder="Apt 42"
        type="address-line2"
        sameLine={2}
        inputStyle={{ alignSelf: "flex-end" }}
        value={user.addressComplement}
        onChangeText={(text) => handleChangeUser("addressComplement", text)}
        valid={isDataValid}
      />
      <Input
        name="Ville"
        placeholder="Paris"
        type="off"
        sameLine={2}
        value={user.city}
        onChangeText={(text) => handleChangeUser("city", text)}
        valid={isDataValid}
      />
      <Input
        name="Code postal"
        placeholder="75000"
        type="postal-code"
        sameLine={2}
        inputStyle={{ alignSelf: "flex-end" }}
        value={user.postalCode?.toString() || ""}
        onChangeText={(text) =>
          handleChangeUser(
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
        value={user.country}
        onChangeText={(text) => handleChangeUser("country", text)}
        valid={isDataValid}
      />
      {type === "guest" && (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Pressable
            style={styles.button}
            onPress={() => {
              const isValid = useFormValidation(user);
              setIsDataValid(isValid);
              if (isValid) {
                resetForm();
                router.dismissAll();
                router.push("/legal/legalNotice");
              }
            }}
          >
            <Text>Valider</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
