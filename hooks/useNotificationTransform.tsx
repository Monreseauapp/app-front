import { AppContext } from "@/context/context";
import { Project, Recommandation } from "@/types";
import { useContext } from "react";

type NotificationData = {
  recommendationsInitiated: Recommandation[];
  recommendationsReceived: Recommandation[];
  companyRecommendations: Recommandation[];
  projectsInitiated: Project[];
  projectsReceived: Project[];
};

export default function useNotificationTransform<T extends NotificationData>(
  data: T
) {
  const { userId, companyId } = useContext(AppContext);
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

  const {
    recommendationsInitiated,
    recommendationsReceived,
    companyRecommendations,
    projectsInitiated,
    projectsReceived,
  } = data;

  const transformedData = [
    ...(recommendationsInitiated || []),
    ...(recommendationsReceived || []),
    ...(companyRecommendations || []),
    ...(projectsInitiated || []),
    ...(projectsReceived || []),
  ].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0);
    const dateB = new Date(b.updatedAt || b.createdAt || 0);
    return dateB.getTime() - dateA.getTime();
  });

  const notifications = transformedData.map((item) => {
    let text = "";
    if ("initiatorId" in item && item.initiatorId === userId) {
      text =
        item.createdAt === item.updatedAt
          ? "Vous avez initié une recommandation."
          : "Une recommandation que vous avez initiée a été mise à jour !";
    } else if ("recipientId" in item && item.recipientId === userId) {
      text =
        item.createdAt === item.updatedAt
          ? "Vous avez reçu une recommandation."
          : "Une recommandation que vous avez reçue a été mise à jour !";
    } else if (
      "RecoStateCompany" in item &&
      "companyId" in item &&
      item.companyId === companyId
    ) {
      text =
        item.createdAt === item.updatedAt
          ? "Votre entreprise a reçu une recommandation."
          : "Une recommandation que votre entreprise a reçue a été mise à jour !";
    } else if ("userId" in item && item.userId === userId) {
      text =
        item.createdAt === item.updatedAt
          ? "Vous avez initié un projet."
          : "Un projet que vous avez initié a été mis à jour !";
    } else if (
      "isPublic" in item &&
      "companyId" in item &&
      item.companyId === companyId
    ) {
      text =
        item.createdAt === item.updatedAt
          ? "Votre entreprise a reçu un projet."
          : "Un projet que votre entreprise a reçu a été mis à jour !";
    }
    return { text, date: item.updatedAt };
  });

  const notificationsByDate: Record<string, string[]> = {};
  notifications.forEach((notification) => {
    const date = new Date(notification.date || 0);
    const formattedDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;
    if (!notificationsByDate[formattedDate]) {
      notificationsByDate[formattedDate] = [];
    }
    notificationsByDate[formattedDate].push(notification.text);
  });

  const sortedNotificationsByDate = Object.entries(notificationsByDate).sort(
    (a, b) => {
      const dateA = new Date(a[0].split(" ").reverse().join("-"));
      const dateB = new Date(b[0].split(" ").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    }
  );
  return {
    notifications: notifications,
    notificationsByDate: sortedNotificationsByDate
      .map(([dateStr, notifications]) => {
        const [day, month, year] = dateStr.split(" ");
        return [`${day} ${MONTHS[Number(month)]} ${year}`, notifications];
      })
      .filter(Boolean),
  };
}
