import Input from "@/components/form/Input";
import { User } from "@/types";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import styles from "./style";

interface Page3Props {
  type: "company" | "guest";
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
}

export default function Page3({ type, user, handleChangeUser }: Page3Props) {
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
      />
      <Input
        name="Adresse ligne 2"
        placeholder="Apt 42"
        type="address-line2"
        sameLine={2}
        inputStyle={{ alignSelf: "flex-end" }}
        value={user.addressComplement}
        onChangeText={(text) => handleChangeUser("addressComplement", text)}
      />
      <Input
        name="Ville"
        placeholder="Paris"
        type="off"
        sameLine={2}
        value={user.city}
        onChangeText={(text) => handleChangeUser("city", text)}
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
      />
      <Input
        name="Pays"
        placeholder="France"
        type="country"
        value={user.country}
        onChangeText={(text) => handleChangeUser("country", text)}
      />
      {type === "guest" && (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Link
            href="/legal/legalNotice"
            style={styles.button}
            onPress={() => {
              router.dismissAll();
            }}
          >
            <Text>Valider</Text>
          </Link>
        </View>
      )}
    </View>
  );
}
