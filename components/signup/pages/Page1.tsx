import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { User } from "@/types";
import { Link } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page1Props {
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  scrollToPage: (index: number) => void;
  isDataValid?: boolean | undefined;
}

export default function Page1({
  user,
  handleChangeUser,
  scrollToPage,
  isDataValid = undefined,
}: Page1Props) {
  return (
    <View
      style={Platform.select({
        web: webStyles.formPage,
        default: styles.formPage,
      })}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={Platform.select({
            web: webStyles.title,
            default: styles.title,
          })}
        >
          Créez votre compte.
        </Text>
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
          valid={isDataValid}
        />
        <Input
          name="Nom"
          placeholder="Doe"
          type={Platform.OS === "android" ? "name-given" : "given-name"}
          sameLine={2}
          titleStyle={{ alignSelf: "flex-end" }}
          inputStyle={{ alignSelf: "flex-end" }}
          value={user.lastName}
          onChangeText={(text) => handleChangeUser("lastName", text)}
          valid={isDataValid}
        />
      </View>
      <Input
        name="Email"
        placeholder="exemple@gmail.com"
        type="email"
        value={user.email}
        onChangeText={(text) => handleChangeUser("email", text)}
        valid={isDataValid}
      />
      <Input
        name="Mot de passe"
        placeholder="********"
        type="new-password"
        value={user.password}
        onChangeText={(text) => handleChangeUser("password", text)}
        valid={isDataValid}
      />
      <Pressable onPress={() => scrollToPage(1)}>
        <Text style={styles.button}>Suivant</Text>
      </Pressable>
      <Link href={{ pathname: "/signin" }} asChild>
        <Text
          style={{
            color: Colors.white,
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
