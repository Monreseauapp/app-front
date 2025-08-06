import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { Company, User } from "@/types";
import { Link, RelativePathString } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page1Props {
  user: User;
  handleChangeUser: (
    field: keyof User,
    value: string | number | boolean | undefined
  ) => void;
  handleChangeCompany: (
    field: keyof Company,
    value: string | number | boolean | undefined
  ) => void;
  scrollToPage: (index: number) => void;
  isDataValid?: boolean | null;
}

export default function Page1({
  user,
  handleChangeUser,
  handleChangeCompany,
  scrollToPage,
  isDataValid = null,
}: Page1Props) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]{8,}$/;

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
          name="Nom"
          placeholder="Doe"
          type={Platform.OS === "android" ? "name-given" : "given-name"}
          sameLine={2}
          value={user.lastName}
          onChangeText={(text) => handleChangeUser("lastName", text)}
          valid={isDataValid}
        />
        <Input
          name="Prénom"
          placeholder="John"
          type={Platform.OS === "android" ? "name-family" : "family-name"}
          sameLine={2}
          titleStyle={{ alignSelf: "flex-end" }}
          inputStyle={{ alignSelf: "flex-end" }}
          value={user.firstName}
          onChangeText={(text) => handleChangeUser("firstName", text)}
          valid={isDataValid}
        />
      </View>
      <Input
        name="Email"
        placeholder="exemple@gmail.com"
        type="email"
        value={user.email}
        onChangeText={(text) => {
          handleChangeCompany("email", text);
          handleChangeUser("email", text);
        }}
        validationMessage="Veuillez entrer un email valide."
        valid={isDataValid}
        isDataCorrect={emailRegex.test(user.email)}
        incorrectMessage="L'email doit être au format exemple@gmail.com"
      />
      <Input
        name="Mot de passe"
        placeholder="********"
        type="new-password"
        value={user.password}
        onChangeText={(text) => handleChangeUser("password", text)}
        valid={isDataValid}
        isDataCorrect={passwordRegex.test(user.password || "")}
        incorrectMessage="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      />
      <Pressable
        onPress={() => {
          scrollToPage(1);
        }}
      >
        <Text style={styles.button}>Créer son compte</Text>
      </Pressable>
      <Link href={{ pathname: "/signin" as RelativePathString }} asChild>
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
