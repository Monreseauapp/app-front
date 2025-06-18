import CustomCheckbox from "@/components/form/customCheckbox";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LegalNotice() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: Colors.background,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Validez les conditions d'accès.</Text>
        <Text style={styles.subtitle}>Les mentions légales</Text>
        <ScrollView style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
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
        >
          <CustomCheckbox
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
            style={styles.checkbox}
            width={25}
            height={25}
          />
          <Text style={styles.checkboxText}>
            J'accepte les mentions légales
          </Text>
        </View>
        <Link
          href="/signin/doubleAuth"
          style={styles.validationButton}
          disabled={!agreedToTerms}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.accent,
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 10,
    textAlign: "center",
  },
  noticeContainer: {
    width: "90%",
    height: "20%",
    borderWidth: 2,
    borderRadius: 25,
    padding: 15,
    borderColor: Colors.background,
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 16,
    color: Colors.background,
    textAlign: "left",
  },
  checkbox: {
    margin: 10,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 4,
  },
  checkboxText: {
    fontSize: 16,
    color: Colors.background,
  },
  validationButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 20,
  },
});
