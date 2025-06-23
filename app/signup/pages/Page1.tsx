import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { User } from "@/types";
import { Link } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import styles from "./style";

interface Page1Props {
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | undefined
  ) => void;
  scrollToPage: (index: number) => void;
  index?: number;
}

export default function Page1({
  user,
  handleChangeUser,
  scrollToPage,
  index = 0,
}: Page1Props) {
  return (
    <View style={styles.formPage}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.title, width: "50%" }}>
          Créez votre compte.
        </Text>
        <Text style={{ ...styles.title, width: "50%" }}>HIBOUUUUUU</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Input
          name="Prénom"
          placeholder="John"
          type={Platform.OS === "android" ? "name-family" : "family-name"}
          sameLine={2}
          value={user.firstName}
          onChangeText={(text) => handleChangeUser("firstName", text)}
        />
        <Input
          name="Nom"
          placeholder="Doe"
          type={Platform.OS === "android" ? "name-given" : "given-name"}
          sameLine={2}
          inputStyle={{ alignSelf: "flex-end" }}
          value={user.lastName}
          onChangeText={(text) => handleChangeUser("lastName", text)}
        />
      </View>
      <Input
        name="Email"
        placeholder="exemple@gmail.com"
        type="email"
        value={user.email}
        onChangeText={(text) => handleChangeUser("email", text)}
      />
      <Input
        name="Mot de passe"
        placeholder="********"
        type="password"
        value={user.password}
        onChangeText={(text) => handleChangeUser("password", text)}
      />
      <Pressable onPress={() => scrollToPage(1)}>
        <Text style={styles.button}>Suivant</Text>
      </Pressable>
      <Link href="/signin">
        <Text
          style={{
            color: Colors.background,
            fontSize: 16,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Vous avez déjà un compte ?
        </Text>
      </Link>
    </View>
  );
}
