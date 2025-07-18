import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./TwoFA.styles";

export default function TwoFA({
  qrCode,
  secret,
}: {
  qrCode: Base64URLString;
  secret: string;
}) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Authentification à deux facteurs : </Text>
        <Text style={styles.text}>
          Scannez le QR Code suivant avec une application
          d&apos;authentification (exemple : Google Authenticator) :
        </Text>
        <Image source={{ uri: qrCode }} style={styles.image} />
        <Text style={styles.text}>
          Ou rentrez le code suivant manuellement dans l&apos;application
          d&apos;authentification:
        </Text>
        <Pressable onPress={() => navigator.clipboard.writeText(secret)}>
          <Text style={styles.secret}>{secret}</Text>
        </Pressable>
        <Text>(Appuyer pour copier le code)</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            router.dismissAll();
            router.push("/legal/legalNotice");
          }}
        >
          <Text style={styles.buttonText}>Continuer</Text>
        </Pressable>
      </View>
    </View>
  );
}
