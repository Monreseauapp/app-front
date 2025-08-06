import { Link, useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

import { styles, webStyles } from "./index.styles";
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={require("@/assets/images/white-logo.png")}
        style={Platform.select({
          web: webStyles.logo,
          default: styles.logo,
        })}
        testID="logo"
      />
      <Text
        style={Platform.select({ web: webStyles.title, default: styles.title })}
      >
        Je m&apos;inscris
      </Text>
      <Text
        style={Platform.select({
          web: webStyles.subTitle,
          default: styles.subTitle,
        })}
      >
        (inscription obligatoire)
      </Text>
      <View
        style={
          Platform.OS === "web"
            ? webStyles.buttonsContainer
            : styles.buttonsContainer
        }
      >
        <Pressable
          style={Platform.select({
            web: { ...webStyles.button },
            default: { ...styles.button, marginTop: 40 },
          })}
          onPress={() => {
            router.push({
              // @ts-ignore
              pathname: "/signup",
              params: { type: "company" },
            });
          }}
          testID="company-button"
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Je suis un professionnel
          </Text>
        </Pressable>
        <Pressable
          style={Platform.select({
            web: { ...webStyles.button },
            default: { ...styles.button, marginTop: 10 },
          })}
          onPress={() => {
            router.push({
              // @ts-ignore
              pathname: "/signup",
              params: { type: "guest" },
            });
          }}
          testID="guest-button"
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Je suis un particulier
          </Text>
        </Pressable>
      </View>
      <Link
        // @ts-ignore
        href="/signin"
        style={{ marginTop: 40 }}
        testID="login-button"
      >
        <Text
          style={Platform.select({
            web: webStyles.connectionText,
            default: styles.connectionText,
          })}
        >
          Je possède déjà un compte
        </Text>
      </Link>
    </View>
  );
}
