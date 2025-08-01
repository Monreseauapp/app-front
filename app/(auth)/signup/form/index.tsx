import Navigation from "@/components/signup/Navigation";
import Page1 from "@/components/signup/pages/Page1";
import Page2 from "@/components/signup/pages/Page2";
import Page3 from "@/components/signup/pages/Page3";
import TwoFA from "@/components/signup/TwoFA";
import { Colors } from "@/constants/Colors";
import { initialCompany } from "@/constants/initial-types-value/initialCompany";
import { initialCompanyProfil } from "@/constants/initial-types-value/initialCompanyProfil";
import { initialUser } from "@/constants/initial-types-value/initialUser";
import { Company, CompanyProfile, SubscriptionType, User } from "@/types";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, webStyles } from "./form.styles";
export interface createUserResponse {
  message: string;
  id: string;
  qrCode: Base64URLString;
  secret: string;
}
const { width } = Dimensions.get("window");
export default function FormSignUp() {
  const { type } = useLocalSearchParams<{ type: "company" | "guest" }>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<User>(initialUser);
  const [company, setCompany] = useState<Company>(initialCompany);
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfile>(initialCompanyProfil);
  const [subscriptionType, setSubscriptionType] = useState<
    SubscriptionType | undefined
  >(undefined);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);
  const [response, setResponse] = useState<createUserResponse | undefined>(
    undefined
  );
  const [mounted, setMounted] = useState(false);
  const [pageHeight, setPageHeight] = useState<number | undefined>(undefined);
  const subscriptionTypesTranslation: Record<string, SubscriptionType> = {
    "Indépendant (0 salariés)": SubscriptionType.Indep,
    "TPE (entre 1 et 19 salariés)": SubscriptionType.VSB,
    "PME (entre 20 et 49 salariés)": SubscriptionType.SMB,
  };
  const resetForm = () => {
    setUser(initialUser);
    setCompany(initialCompany);
    setCompanyProfile(initialCompanyProfil);
    setSubscriptionType(undefined);
    setIsDataValid(null);
  };
  const scrollToPage = (index: number) => {
    setCurrentPage(index);
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
  const handleChangeCompanyProfile = (
    key: keyof CompanyProfile,
    value: any
  ) => {
    setCompanyProfile((prevProfile) => ({
      ...prevProfile,
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
          handleChangeCompany={handleChangeCompany}
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
          company={company}
          subscriptionType={subscriptionType}
          subscriptionTypesTranslation={subscriptionTypesTranslation}
          handleChangeUser={handleChangeUser}
          handleChangeCompany={handleChangeCompany}
          resetForm={resetForm}
          setResponse={setResponse}
          setIsDataValid={setIsDataValid}
          setSubscriptionType={setSubscriptionType}
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
          companyProfile={companyProfile}
          company={company}
          subscriptionType={subscriptionType}
          handleChangeCompanyProfile={handleChangeCompanyProfile}
          isDataValid={isDataValid}
          setIsDataValid={setIsDataValid}
          setResponse={setResponse}
        />
      ),
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && (!type || (type !== "company" && type !== "guest"))) {
      router.replace("/" as RelativePathString);
    }
  }, [mounted, router, type]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback
        onPress={() => Platform.OS !== "web" && Keyboard.dismiss()}
      >
        <ScrollView
          style={Platform.OS === "web" ? webStyles.container : styles.container}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {response && (
            <TwoFA
              type={type}
              qrCode={response.qrCode}
              secret={response.secret}
              email={company.email}
              formReset={resetForm}
            />
          )}
          <Image
            source={require("@/assets/images/white-logo.png")}
            style={Platform.select({
              web: webStyles.logo,
              default: styles.logo,
            })}
          />
          {type === "company" ? (
            <Text
              style={Platform.select({
                web: webStyles.introText,
                default: styles.introText,
              })}
            >
              Inscrivez vous dès maintenant pour accéder au{" "}
              <Text style={styles.span}>questionnaire</Text> et valider la{" "}
              <Text style={styles.span}>première étape</Text> de votre
              inscription.
            </Text>
          ) : (
            <Text style={styles.introText}>
              Inscrivez vous dès maintenant et vivez l&apos;expérience Inscrivez
              vous dès maintenant et vivez l&apos;expérience{" "}
              <Text style={{ ...styles.span, color: Colors.violet }}>
                Mon Réseau
              </Text>{" "}
              dès maintenant.
            </Text>
          )}
          <View
            style={[
              Platform.OS === "web"
                ? webStyles.formContainer
                : styles.formContainer,
              {
                height: pageHeight,
              },
            ]}
          >
            <View
              onLayout={(event) =>
                setPageHeight(event.nativeEvent.layout.height)
              }
              style={{
                width:
                  Platform.OS === "web"
                    ? width * (width >= 800 ? 0.55 : 0.9)
                    : width,
              }}
            >
              {allPages[currentPage].content(currentPage)}
            </View>
            <Navigation
              currentPage={currentPage}
              pages={allPages}
              type={type}
              scrollToPage={scrollToPage}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
