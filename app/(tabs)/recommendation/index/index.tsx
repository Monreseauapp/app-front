import { Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { styles, webStyles } from "./index.styles";

export default function RecommendationChoice() {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={Platform.select({
            web: webStyles.title,
            default: styles.title,
          })}
        >
          JE DEPOSE UNE RECOMMANDATION
        </Text>
        <Link
          style={Platform.select({
            web: webStyles.button,
            default: styles.button,
          })}
          href="/recommendation/form?type=company"
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Je recommande
          </Text>
        </Link>
        <Link
          style={Platform.select({
            web: webStyles.button,
            default: styles.button,
          })}
          href="/recommendation/form?type=lead"
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            J&apos;apporte un prospect
          </Text>
        </Link>
        <Link
          style={Platform.select({
            web: webStyles.button,
            default: styles.button,
          })}
          href="/recommendation/form?type=project"
        >
          <Text
            style={Platform.select({
              web: webStyles.buttonText,
              default: styles.buttonText,
            })}
          >
            Je dépose un projet
          </Text>
        </Link>
      </View>
    </View>
  );
}
