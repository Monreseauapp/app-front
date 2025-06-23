import CheckBoxList from "@/components/form/CheckboxList";
import Select from "@/components/form/Select";
import { SubscriptionType } from "@/types";
import { Text, View } from "react-native";
import styles from "./style";

interface Page5Props {
  subscriptionType: SubscriptionType | undefined;
  setSubscriptionType: (value: SubscriptionType) => void;
  subscriptionTypesTranslation: Record<string, string>;
}

export default function Page5({
  subscriptionType,
  setSubscriptionType,
  subscriptionTypesTranslation,
}: Page5Props) {
  return (
    <View style={styles.formPage}>
      <Select
        title="Vous êtes..."
        choices={Object.keys(subscriptionTypesTranslation)}
        selected={Object.keys(subscriptionTypesTranslation).find(
          (key) => subscriptionTypesTranslation[key] === subscriptionType
        )}
        setSelected={(value) => {
          setSubscriptionType(
            subscriptionTypesTranslation[value] as SubscriptionType
          );
        }}
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
  );
}
