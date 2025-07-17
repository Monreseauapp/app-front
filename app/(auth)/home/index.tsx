import { Link, useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./home.styles";

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
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Devenir membre (entreprise)
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
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Je découvre mon réseau
          </Text>
        </Pressable>
      </View>
      <Link
        // @ts-ignore
        href="/signin"
        style={{ marginTop: 40 }}
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
