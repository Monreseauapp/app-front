import CustomCheckbox from "@/components/form/CustomCheckbox";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company } from "@/types";
import axios from "axios";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles, webStyles } from "./legalNotice.styles";
export default function LegalNotice() {
  const { API_URL, userId } = useContext(AppContext);
  const { redirect, email } = useLocalSearchParams();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const updateUserConsent = async () => {
    return await axios
      .patch(`${API_URL}/users/${email ? company?.ownerId : userId}`, {
        consentTerms: true,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  };
  const handleSubmit = async () => {
    if (email) {
      const company = await axios
        .get(`${API_URL}/company/email/${email}`)
        .then((response) => response.data)
        .catch(() => {
          setError(
            "Une erreur s'est produite lors de la validation des conditions. Essayer à nouveau.",
          );
        });
      setCompany(company);
    }
    return updateUserConsent();
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: Platform.OS === "web" ? "center" : "flex-end",
        backgroundColor: Colors.white,
      }}
    >
      <Image
        source={require("@/assets/images/white-logo.png")}
        style={Platform.select({ web: webStyles.logo, default: styles.logo })}
      />
      <View
        style={Platform.OS === "web" ? webStyles.container : styles.container}
      >
        <Text style={styles.title}>Validez les conditions d&apos;accès.</Text>
        <Text style={styles.subtitle}>Les mentions légales</Text>
        <ScrollView style={styles.noticeContainer}>
          <Text style={styles.noticeText} testID="legal-notice-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui itaque
            voluptatum praesentium ipsum magnam repellat nobis voluptatibus
            perspiciatis ducimus excepturi omnis voluptate exercitationem
            repudiandae officia vel, eveniet vero! Velit, iste! Natus asperiores
            earum quasi ratione voluptates esse. Explicabo sapiente recusandae
            doloremque suscipit veniam nihil molestias obcaecati quaerat placeat
            pariatur? Obcaecati cumque cum consectetur dolore optio ea inventore
            modi id laboriosam! Culpa laborum provident iure distinctio soluta
            quo ipsum minus pariatur. Soluta ea facere recusandae consequatur
            laudantium iusto aliquid quo, eligendi quibusdam, distinctio
            cupiditate aperiam voluptatum! Fuga officia facilis libero eos! Ab,
            sit. Quos ipsam earum dolorem, ducimus sed harum totam ut dolores
            temporibus, alias modi illo? Deserunt dolore accusamus porro
            incidunt corporis, dignissimos quod ipsum dolores, molestias
            pariatur sint amet. Impedit a itaque consequatur ipsam ea
            necessitatibus autem labore qui accusamus. Consequuntur suscipit
            iure obcaecati fugiat consequatur accusamus, voluptates, libero
            possimus ducimus voluptatum itaque vero cupiditate esse, iusto
            labore quod! Reiciendis nam, incidunt corrupti numquam aspernatur
            exercitationem saepe, labore quo et nobis iste laudantium sunt id
            libero dicta autem? Id molestiae delectus repellat, saepe eum quas
            itaque deleniti at cupiditate! Distinctio tempore cumque numquam,
            dolore doloremque, animi veniam magni asperiores amet eum quos illum
            quidem vel ea provident? Laborum mollitia quis explicabo reiciendis
            non illum vitae optio nesciunt accusamus soluta. Obcaecati
            temporibus dolorum voluptatum ipsa similique delectus porro velit
            odit, nulla cumque magni perspiciatis facere officia natus veniam
            recusandae commodi nobis perferendis consectetur esse, mollitia
            optio? Nemo maiores inventore repellendus. Aliquam eius nostrum
            minus, fugiat explicabo, sit nobis, cupiditate minima unde hic dolor
            quae cum voluptate quasi distinctio ex inventore corrupti nemo alias
            neque culpa? Aut placeat facere sapiente aspernatur? Sed,
            necessitatibus reprehenderit velit consectetur nemo accusantium enim
            nisi dolorem quae deserunt illum, ducimus, totam mollitia iusto
            deleniti repellendus voluptate? Officiis mollitia possimus nisi
            similique, nobis adipisci nam quo? Suscipit.
          </Text>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          testID="legal-notice-checkbox-container"
        >
          <CustomCheckbox
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
            markerStyle={Colors.white}
            style={styles.checkbox}
            width={25}
            height={25}
          />
          <Text style={styles.checkboxText}>
            J&apos;accepte les mentions légales
          </Text>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable
          onPress={async () => {
            if (agreedToTerms && (await handleSubmit())) {
              router.push(
                redirect
                  ? (redirect.toString() as RelativePathString)
                  : ("/signin" as RelativePathString),
              );
            } else if (agreedToTerms) {
              setError(
                "Une erreur s'est produite lors de la validation des conditions. Essayer à nouveau.",
              );
            }
          }}
          style={styles.validationButton}
          disabled={!agreedToTerms}
          testID="legal-notice-validation-button"
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </Pressable>
      </View>
    </View>
  );
}
