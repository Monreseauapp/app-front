import InnerNavBar from "@/components/InnerNavBar";
import ProjectView from "@/components/my-projects/Project";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import useProjectFetch from "@/hooks/useProjectFetch";
import { Company, Project, User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import styles from "./index.styles";
export interface CompleteProject {
  project: Project;
  initiator?: User;
  company?: Company;
}
export default function MyRecommendations() {
  const { API_URL, companyId } = useContext(AppContext);
  const [updated, setUpdated] = useState<boolean>(false);
  const { projectsReceived, projectsSent } = useProjectFetch(updated);
  const [completeReceived, setCompleteReceived] = useState<CompleteProject[]>(
    [],
  );
  const [completeSent, setCompleteSent] = useState<CompleteProject[]>([]);
  const [page, setPage] = useState<string>("sent");
  const fetchCompleteProjects = async (projects: Project[]) => {
    const completeProjects: CompleteProject[] = await Promise.all(
      projects.map(async (proj) => {
        const initiator = await axios
          .get(`${API_URL}/users/${proj.userId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching user data", error.request);
          });
        const company = await axios
          .get(`${API_URL}/company/${proj.companyId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching user data", error.request);
          });
        return {
          project: proj,
          initiator: initiator,
          company: company,
        };
      }),
    );
    return completeProjects;
  };
  useEffect(() => {
    const setCompleteRecommendations = async () => {
      const completeReceived = await fetchCompleteProjects(projectsReceived);
      const completeSent = await fetchCompleteProjects(projectsSent);
      setCompleteReceived(completeReceived);
      setCompleteSent(completeSent);
    };
    if (projectsReceived.length > 0 || projectsSent.length > 0) {
      setCompleteRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsReceived, projectsSent]);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "web" ? -30 : 0,
      }}
    >
      <Text style={styles.title}>Mes Projets</Text>
      {companyId && (
        <InnerNavBar
          tabs={["Envoyées", "Reçues"]}
          activeIndex={page === "sent" ? 0 : 1}
          setActiveIndex={() => setPage(page === "sent" ? "received" : "sent")}
        />
      )}
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          marginTop: 20,
          backgroundColor: Colors.white,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: Platform.OS === "web" ? "row" : "column",
          flexWrap: Platform.OS === "web" ? "wrap" : "nowrap",
          gap: 20,
        }}
      >
        {(page === "sent" ? completeSent : completeReceived).length > 0 ? (
          (page === "sent" ? completeSent : completeReceived).map((proj) => (
            <ProjectView
              key={page + proj.project.id}
              {...proj}
              page={page}
              setUpdated={setUpdated}
            />
          ))
        ) : (
          <Text style={styles.noProjects}>
            Aucun projet {page === "sent" ? "envoyé" : "reçu"}.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
