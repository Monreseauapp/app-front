import { Colors } from "@/constants/Colors";
import useNotificationFetch from "@/hooks/useNotificationFetch";
import useNotificationTransform from "@/hooks/useNotificationTransform";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import { styles, webStyles } from "./notification.styles";
// AJOUTER UNE DIFFERENCE ENTRE READ ET UNREAD
export default function Notification() {
  const MONTHS: Record<number, string> = {
    1: "janvier",
    2: "février",
    3: "mars",
    4: "avril",
    5: "mai",
    6: "juin",
    7: "juillet",
    8: "août",
    9: "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
  };
  const { notificationsByDate } = useNotificationTransform(
    useNotificationFetch()
  );
  const date = new Date();
  const formattedDate = `${date.getDate()} ${
    MONTHS[date.getMonth() + 1]
  } ${date.getFullYear()}`;
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>MON ACTUALITE</Text>
      <ScrollView
        style={{
          flex: 1,
          width: width >= 768 ? "80%" : "100%",
          marginTop: 20,
          backgroundColor: Colors.white,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          gap: 30,
        }}
      >
        {notificationsByDate &&
          notificationsByDate.map(([date, notificationList], index) => (
            <View
              style={styles.notificationContainer}
              key={date + index.toString()}
            >
              <Text style={styles.notificationTitle}>
                {formattedDate === date ? "Aujourd'hui" : date}
              </Text>
              <View style={styles.notifications}>
                {notificationList &&
                  (notificationList as string[]).map((notification, idx) => (
                    <View
                      key={idx}
                      style={
                        Platform.OS === "web"
                          ? webStyles.notification
                          : styles.notification
                      }
                    >
                      <Text style={styles.notificationText}>
                        {notification}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
