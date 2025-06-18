import BackIcon from "@/assets/icons/back.svg";
import StarIcon from "@/assets/icons/star.svg";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type RecommendationFormParams = {
  type: "company" | "lead" | "project";
};

type RecommendationFormTitles = {
  label: RecommendationFormParams["type"];
  text: string;
};

export default function RecommendationForm() {
  const router = useRouter();
  const { type } = useLocalSearchParams<RecommendationFormParams>();
  const titles: RecommendationFormTitles[] = [
    {
      label: "company",
      text: "JE RECOMMANDE UNE ENTREPRISE",
    },
    {
      label: "lead",
      text: "J'APPORTE UN PROSPECT",
    },
    {
      label: "project",
      text: "JE DEPOSE UN PROJET",
    },
  ];
  const [starId, setStarId] = useState<number>(0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            position: "relative",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={styles.backIcon}
            hitSlop={20}
          >
            <BackIcon color={Colors.accent} width={30} height={30} />
          </Pressable>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 160,
            }}
          >
            <Text style={styles.title}>
              {titles.find((title) => title.label === type)?.text}
            </Text>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              {type === "company" && (
                <View>
                  <Input
                    name="Nom de l'entreprise"
                    placeholder="Mon Entreprise"
                    type="organization"
                    titleStyle={styles.inputTitle}
                    inputStyle={{
                      ...styles.input,
                      placeholderTextColor: Colors.grey,
                    }}
                  />

                  <Select
                    title="Secteur d'activité"
                    choices={[
                      "Informatique",
                      "Marketing",
                      "Finance",
                      "Santé",
                      "Éducation",
                      "Autre",
                    ]}
                    titleStyle={styles.inputTitle}
                    selectStyle={{
                      ...styles.select,
                      pickerTextColor: Colors.text,
                    }}
                  />
                </View>
              )}
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
                  type={
                    Platform.OS === "android" ? "name-family" : "family-name"
                  }
                  sameLine={2}
                  titleStyle={styles.inputTitle}
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                  }}
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
              />
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
                />
              </View>
              {type === "company" && (
                <Input
                  name="Avez vous déjà utilisé une application similaire ?"
                  placeholder="Expliquez-nous en quelques mots votre expérience."
                  type="off"
                  multiline={true}
                  titleStyle={styles.inputTitle}
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                  }}
                />
              )}
              {type !== "company" && (
                <Input
                  name="Détails du besoin"
                  placeholder=""
                  type="off"
                  multiline={true}
                  titleStyle={styles.inputTitle}
                  inputStyle={{
                    ...styles.input,
                    placeholderTextColor: Colors.grey,
                  }}
                />
              )}
            </View>
            {type !== "company" && (
              <View
                style={{
                  alignItems: "flex-start",
                  marginTop: 10,
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.priority}>Niveau de priorité</Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginTop: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Pressable
                      key={i}
                      onPress={() => {
                        setStarId(i);
                      }}
                    >
                      <StarIcon
                        color={i <= starId ? Colors.accent : Colors.text}
                        width={40}
                        height={40}
                        style={{ marginRight: 5 }}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
            <View style={{ alignSelf: "center" }}>
              <Pressable
                onPress={() => router.back()}
                style={styles.validationButton}
              >
                <Text style={styles.buttonText}>Envoyer ma recommandation</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  title: {
    width: "90%",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
  },
  backIcon: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    padding: 20,
  },
  inputTitle: {
    color: Colors.text,
  },
  input: {
    borderColor: Colors.accent,
    color: Colors.text,
    borderWidth: 4,
  },
  select: {
    backgroundColor: Colors.background,
    color: Colors.text,
  },
  priority: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginLeft: 25,
  },
  validationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.accent,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "bold",
    fontSize: 18,
  },
});
