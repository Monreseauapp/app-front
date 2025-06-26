import InnerNavBar from "@/components/InnerNavBar";
import ProjectView from "@/components/my-projects/Project";
import { Colors } from "@/constants/Colors";
import { AppContext } from "@/context/context";
import { Company, Project, User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface CompleteProject {
  project: Project;
  initiator?: User;
  company?: Company;
}

export default function MyRecommendations() {
  const { API_URL, companyId } = useContext(AppContext);
  const [projectsReceived, setProjectsReceived] = useState<Project[]>([]);
  const [projectsSent, setProjectsSent] = useState<Project[]>([]);
  const [completeReceived, setCompleteReceived] = useState<CompleteProject[]>(
    []
  );
  const [completeSent, setCompleteSent] = useState<CompleteProject[]>([]);
  const [page, setPage] = useState<string>("sent");
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjectsReceived = async () => {
      axios
        .get(`${API_URL}/project/company/${companyId}`)
        .then((response) => setProjectsReceived(response.data))
        .catch((error) => {
          console.error("Error fetching recommendations:", error.request);
        });
    };
    const fetchProjectsSent = async () => {
      const allUsers = await axios
        .get(`${API_URL}/company/${companyId}/users`)
        .then((response) => response.data.users)
        .catch((error) => {
          console.error("Error fetching users:", error.request);
        });
      const sent = await Promise.all(
        allUsers.map(async (user: User) => {
          return await axios
            .get(`${API_URL}/project/user/${user.id}`)
            .then((response) => response.data)
            .catch((error) => {
              console.error("Error fetching recommendations:", error.request);
              return null;
            });
        })
      );
      setProjectsSent(sent.flat().filter((item) => item !== null));
    };
    fetchProjectsReceived();
    fetchProjectsSent();
    if (updated) {
      setUpdated(false);
    }
  }, [companyId, updated]);

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
      })
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
  }, [projectsReceived, projectsSent]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
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
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {(page === "sent" ? completeSent : completeReceived).map((rec) => (
          <ProjectView
            key={page + rec.project.id}
            {...rec}
            page={page}
            setUpdated={setUpdated}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent,
    marginBottom: 20,
    marginTop: 140,
  },
});
