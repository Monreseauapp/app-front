import { Colors } from "@/constants/Colors";
import { Recommandation } from "@/types";
import { Platform, View } from "react-native";
import Input from "../../form/Input";
import styles from "./PersonalInformations.styles";

interface PersonalInformationsProps {
  recommandation: Recommandation;
  handleChange: (field: keyof Recommandation, value: string) => void;
  isDataValid?: boolean;
}

export default function PersonalInformations({
  recommandation,
  handleChange,
  isDataValid = undefined,
}: PersonalInformationsProps) {
  return (
    <>
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
          titleStyle={styles.inputTitle}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
          }}
          value={recommandation.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          valid={isDataValid}
        />
        <Input
          name="Nom"
          placeholder="Doe"
          type={Platform.OS === "android" ? "name-given" : "given-name"}
          sameLine={2}
          titleStyle={styles.inputTitle}
          inputStyle={{
            ...styles.input,
            placeholderTextColor: Colors.grey,
            alignSelf: "flex-end",
          }}
          value={recommandation.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          valid={isDataValid}
        />
      </View>
      <Input
        name="Numéro de téléphone"
        placeholder="+33 6 12 34 56 78"
        type={Platform.OS === "android" ? "tel-national" : "tel"}
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        value={recommandation.phone}
        onChangeText={(text) => handleChange("phone", text)}
        valid={isDataValid}
      />
      <Input
        name="Adresse mail"
        placeholder="exemple@gmail.com"
        type="email"
        titleStyle={styles.inputTitle}
        inputStyle={{
          ...styles.input,
          placeholderTextColor: Colors.grey,
        }}
        value={recommandation.email}
        onChangeText={(text) => handleChange("email", text)}
        valid={isDataValid}
      />
    </>
  );
}
