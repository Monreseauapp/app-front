import Navigation from "@/components/signup/Navigation";
import { Colors } from "@/constants/Colors";
import { initialCompany } from "@/constants/initial-types-value/initialCompany";
import { initialUser } from "@/constants/initial-types-value/initialUser";
import { AppContext } from "@/context/context";
import { Company, SubscriptionType, User } from "@/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./form.styles";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";

const { width } = Dimensions.get("window");

export default function FormSignUp() {
  const { API_URL } = useContext(AppContext);
  const { type } = useLocalSearchParams<{ type: "company" | "guest" }>();
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [jobDomains, setJobDomains] = useState<
    { id: string; domaine: string }[]
  >([]);
  const [user, setUser] = useState<User>(initialUser);

  const [company, setCompany] = useState<Company>(initialCompany);

  const [subscriptionType, setSubscriptionType] = useState<
    SubscriptionType | undefined
  >(undefined);
  const [isDataValid, setIsDataValid] = useState<boolean | undefined>(
    undefined
  );

  const subscriptionTypesTranslation: Record<string, SubscriptionType> = {
    "Indépendant (0 salariés)": SubscriptionType.Indep,
    "TPE (entre 1 et 19 salariés)": SubscriptionType.VSB,
    "PME (entre 20 et 49 salariés)": SubscriptionType.SMB,
  };

  const resetForm = () => {
    setUser(initialUser);
    setCompany(initialCompany);
    setSubscriptionType(undefined);
    setIsDataValid(false);
  };

  useEffect(() => {
    const fetchJobDomains = async () => {
      axios
        .get(`${API_URL}/job-domain`)
        .then((response) => {
          const domains = response.data;
          setJobDomains(
            domains.map((domain: { id: string; domaine: string }) => ({
              id: domain.id,
              domaine: domain.domaine,
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching job domains:", error.response);
        });
    };
    fetchJobDomains();
  }, []);

  const scrollToPage = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentPage(index);
    }
  };

  const handleChangeUser = (key: keyof User, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const handleChangeCompany = (key: keyof Company, value: any) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      [key]: value,
    }));
  };

  const allPages = [
    {
      key: "page1",
      content: (index: number) => (
        <Page1
          user={user}
          handleChangeUser={handleChangeUser}
          scrollToPage={scrollToPage}
          isDataValid={isDataValid}
        />
      ),
    },
    {
      key: "page2",
      content: (index: number) => (
        <Page2
          type={type}
          user={user}
          jobDomains={jobDomains}
          handleChangeUser={handleChangeUser}
          handleChangeCompany={handleChangeCompany}
          isDataValid={isDataValid}
        />
      ),
    },
    {
      key: "page3",
      content: (index: number) => (
        <Page3
          type={type}
          user={user}
          handleChangeUser={handleChangeUser}
          isDataValid={isDataValid}
          resetForm={resetForm}
          setIsDataValid={setIsDataValid}
        />
      ),
    },
    {
      key: "page4",
      content: (index: number) => (
        <Page4
          company={company}
          handleChangeCompany={handleChangeCompany}
          handleChangeUser={handleChangeUser}
          isDataValid={isDataValid}
        />
      ),
    },
    {
      key: "page5",
      content: (index: number) => (
        <Page5
          subscriptionType={subscriptionType}
          setSubscriptionType={setSubscriptionType}
          subscriptionTypesTranslation={subscriptionTypesTranslation}
          isDataValid={isDataValid}
        />
      ),
    },
    {
      key: "page6",
      content: (index: number) => <Page6 isDataValid={isDataValid} />,
    },
    {
      key: "page7",
      content: (index: number) => (
        <Page7
          user={user}
          company={company}
          resetForm={resetForm}
          setIsDataValid={setIsDataValid}
          isDataValid={isDataValid}
        />
      ),
    },
  ];

  const pages =
    type === "guest"
      ? allPages.filter((page) => page.key !== "page2")
      : allPages;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/white-logo.png")}
            style={styles.logo}
          />
          {type === "company" ? (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant pour accéder au{" "}
              <Text style={styles.span}>questionnaire</Text> et valider la{" "}
              <Text style={styles.span}>première étape</Text> de votre
              inscription.
            </Text>
          ) : (
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

            <Navigation
              currentPage={currentPage}
              pages={pages}
              type={type}
              scrollToPage={scrollToPage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
