import LeftArrow from "@/assets/icons/left-arrow.svg";
import RightArrow from "@/assets/icons/right-arrow.svg";
import CheckBoxList from "@/components/form/CheckboxList";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { Colors } from "@/constants/Colors";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function FormSignUp() {
  const { type } = useLocalSearchParams<{ type: "company" | "guest" }>();
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const scrollToPage = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentPage(index);
    }
  };

  const pages = [
    {
      key: "page1",
      content: (index: number) => (
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
              placeholder="Margot"
              type={Platform.OS === "android" ? "name-family" : "family-name"}
              sameLine={2}
            />
            <Input
              name="Nom"
              placeholder="Caron"
              type={Platform.OS === "android" ? "name-given" : "given-name"}
              sameLine={2}
            />
          </View>
          <Input name="Email" placeholder="exemple@gmail.com" type="email" />
          <Input name="Mot de passe" placeholder="********" type="password" />
          {type === "guest" && (
            <Link
              href="/home"
              style={styles.button}
              onPress={() => {
                router.dismissAll();
              }}
            >
              <Text>Suivant</Text>
            </Link>
          )}
          {type === "company" && (
            <Pressable onPress={() => scrollToPage(index + 1)}>
              <Text style={styles.button}>Suivant</Text>
            </Pressable>
          )}
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
      ),
    },
    {
      key: "page2",
      content: (index: number) => (
        <View style={styles.formPage}>
          <Select
            title="Vous êtes..."
            choices={[
              "Indépendant (0 salariés)",
              "TPE (entre 1 et 19 salariés)",
              "PME (entre 20 et 49 salariés)",
            ]}
          />
          <CheckBoxList
            title="La raison de votre inscription (choix multiple)"
            choices={[
              <Text style={styles.checkboxText}>
                Pour obtenir des <Text style={styles.span}>prospects</Text>
              </Text>,
              <Text style={styles.checkboxText}>
                Pour gagner en <Text style={styles.span}>visibilité</Text>
              </Text>,
              <Text style={styles.checkboxText}>
                Recevoir des <Text style={styles.span}>recommandations</Text>
              </Text>,
              <Text style={styles.checkboxText}>
                Développer votre <Text style={styles.span}>réseau</Text>
              </Text>,
            ]}
          />
        </View>
      ),
    },
    {
      key: "page3",
      content: (index: number) => (
        <View style={styles.formPage}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Input
              name="Avez vous déjà utilisé une application similaire ?"
              placeholder="Expliquez-nous en quelques mots votre expérience."
              type="off"
              multiline={true}
            />
          </View>
          <CheckBoxList
            title="La raison de votre inscription (choix multiple)"
            choices={[
              <Text style={styles.checkboxText}>Les particuliers</Text>,
              <Text style={styles.checkboxText}>Les indépendants/TPE</Text>,
              <Text style={styles.checkboxText}>
                Les PME et grands comptes
              </Text>,
            ]}
          />
        </View>
      ),
    },
    {
      key: "page4",
      content: (index: number) => (
        <View style={styles.formPage}>
          <Input
            name="Décrivez votre activité en quelques mots."
            placeholder=""
            type="off"
            multiline={true}
          />
          <CheckBoxList
            title="La raison de votre inscription (choix multiple)"
            choices={[
              <Text style={styles.checkboxText}>Responsabilité civile</Text>,
              <Text style={styles.checkboxText}>Décenale</Text>,
              <Text style={styles.checkboxText}>Autres</Text>,
            ]}
          />
          <Link
            href="/home"
            style={styles.validationButton}
            asChild
            onPress={() => {
              router.dismissAll();
            }}
          >
            <Text>Valider</Text>
          </Link>
        </View>
      ),
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {type === "company" && (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant pour accéder au{" "}
              <Text style={styles.span}>questionnaire</Text> et valider la{" "}
              <Text style={styles.span}>première étape</Text> de votre
              inscription.
            </Text>
          )}
          {type === "guest" && (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant et vivez l'expérience{" "}
              <Text style={{ ...styles.span, color: Colors.accent }}>
                Mon Réseau
              </Text>{" "}
              dès maintenant.
            </Text>
          )}
          <View style={styles.formContainer}>
            <FlatList
              ref={flatListRef}
              horizontal
              snapToInterval={width}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              data={pages}
              keyExtractor={(item) => item.key}
              renderItem={({ item, index }) => (
                <View style={{ width }}>{item.content(index)}</View>
              )}
              contentContainerStyle={{ alignItems: "center" }}
              scrollEnabled={false}
            />

            {currentPage > 0 && (
              <>
                <Pressable
                  onPress={() => scrollToPage(currentPage - 1)}
                  style={{
                    position: "absolute",
                    left: 24,
                    bottom: 24,
                    width: 40,
                    height: 40,
                  }}
                >
                  <LeftArrow width={40} height={40} />
                </Pressable>

                {currentPage < pages.length - 1 && (
                  <Pressable
                    onPress={() => scrollToPage(currentPage + 1)}
                    style={{
                      position: "absolute",
                      right: 24,
                      bottom: 24,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <RightArrow width={40} height={40} />
                  </Pressable>
                )}
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  span: {
    fontWeight: "bold",
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 50,
    width: "70%",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  formPage: {
    width: width,
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: "center",
  },
  title: {
    color: Colors.background,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: Colors.background,
    borderWidth: 5,
    borderRadius: 50,
    textAlign: "center",
  },
  checkboxText: {
    color: Colors.background,
    fontSize: 18,
    marginLeft: 8,
  },
  validationButton: {
    backgroundColor: Colors.background,
    color: Colors.accent,
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
  },
});
