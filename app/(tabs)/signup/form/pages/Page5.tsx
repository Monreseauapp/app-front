import CheckBoxList from "@/components/form/CheckboxList";
import Select from "@/components/form/Select";
import { SubscriptionType } from "@/types";
import { Platform, Text, View } from "react-native";
import { styles, webStyles } from "./pages.styles";

interface Page5Props {
  subscriptionType: SubscriptionType | undefined;
  setSubscriptionType: (value: SubscriptionType) => void;
  subscriptionTypesTranslation: Record<string, string>;
  isDataValid: boolean | undefined;
}

export default function Page5({
  subscriptionType,
  setSubscriptionType,
  subscriptionTypesTranslation,
  isDataValid = undefined,
}: Page5Props) {
  return (
    <View
      style={Platform.select({
        web: webStyles.formPage,
        default: styles.formPage,
      })}
    >
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
        valid={isDataValid}
      />
      <CheckBoxList
        title="La raison de votre inscription (choix multiple)"
        choices={[
          <Text
            key={"prospects"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Pour obtenir des <Text style={styles.span}>prospects</Text>
          </Text>,
          <Text
            key={"visibility"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Pour gagner en <Text style={styles.span}>visibilité</Text>
          </Text>,
          <Text
            key={"recommendations"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Recevoir des <Text style={styles.span}>recommandations</Text>
          </Text>,
          <Text
            key={"network"}
            style={Platform.select({
              web: webStyles.checkboxText,
              default: styles.checkboxText,
            })}
          >
            Développer votre <Text style={styles.span}>réseau</Text>
          </Text>,
        ]}
      />
    </View>
  );
}
