import CustomCheckbox from "@/components/form/CustomCheckbox";
import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import styles from "./PersonTypeSelector.styles";

export default function PersonTypeSelector({
  intern,
  setIntern,
  type,
}: {
  intern: boolean;
  setIntern: (value: boolean) => void;
  type: "company" | "user";
}) {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.text,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {type === "company" ? "L'entreprise" : "La personne"} est membre de
        l'application ?
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-around",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: 150, alignItems: "center" }}>
          <Text style={styles.basicText}>Membre</Text>
          <CustomCheckbox
            checked={intern}
            onChange={(value) => setIntern(value)}
            width={40}
            height={40}
            style={styles.checkbox}
            markerStyle={Colors.background}
          />
        </View>
        <View style={{ width: 150, alignItems: "center" }}>
          <Text style={styles.basicText}>Non-membre</Text>
          <CustomCheckbox
            checked={!intern}
            onChange={(value) => setIntern(!value)}
            width={40}
            height={40}
            style={styles.checkbox}
            markerStyle={Colors.background}
          />
        </View>
      </View>
    </View>
  );
}
