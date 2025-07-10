import useNotificationFetch from "@/hooks/useNotificationFetch";
import useNotificationTransform from "@/hooks/useNotificationTransform";
import { Platform, Text, View } from "react-native";
import { styles, webStyles } from "./News.styles";

export default function News() {
  const { notifications } = useNotificationTransform(useNotificationFetch());

  return (
    <>
      {notifications.length > 0 && (
        <View style={{ marginBottom: 50 }}>
          <Text
            style={[
              Platform.select({
                web: webStyles.title,
                default: styles.title,
              }),
              { alignSelf: "center", marginTop: 10, marginBottom: 20 },
            ]}
          >
            Mes 5 dernières actualités
          </Text>
          <View style={styles.notifications}>
            {notifications.slice(0, 5).map((notification, index) => (
              <View
                style={
                  Platform.OS === "web"
                    ? webStyles.notificationContainer
                    : styles.notificationContainer
                }
                key={index}
              >
                <Text key={index} style={styles.notificationText}>
                  {notification.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  );
}
