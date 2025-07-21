import { AppContext } from "@/context/context";
import { Project, User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function useProjectFetch(updated?: boolean) {
  const { API_URL, companyId, userId, token } = useContext(AppContext);
  const [projectsReceived, setProjectsReceived] = useState<Project[]>([]);
  const [projectsSent, setProjectsSent] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    setIsLoading(true);
    setError(null);
    const fetchProjectsReceived = async () => {
      axios
        .get(`${API_URL}/project/company/${companyId}`)
        .then((response) => setProjectsReceived(response.data))
        .catch((error) => {
          console.error("Error fetching recommendations:", error.request);
          setError("Failed to fetch projects.");
        });
    };
    const fetchProjectsSent = async () => {
      if (companyId) {
        const allUsers = await axios
          .get(`${API_URL}/company/${companyId}/users`)
          .then((response) => response.data.users)
          .catch((error) => {
            console.error("Error fetching users:", error.request);
            setError("Failed to fetch users.");
          });
        if (!allUsers) return;
        const sent = await Promise.all(
          allUsers.map(async (user: User) => {
            return await axios
              .get(`${API_URL}/project/user/${user.id}`)
              .then((response) => response.data)
              .catch((error) => {
                console.error("Error fetching recommendations:", error.request);
                setError("Failed to fetch projects.");
                return null;
              });
          })
        );
        setProjectsSent(sent.flat().filter((item) => item !== null));
      } else {
        const userSentProjects = await axios
          .get(`${API_URL}/project/user/${userId}`)
          .then((response) => response.data)
          .catch((error) => {
            console.error("Error fetching recommendations:", error.request);
            setError("Failed to fetch projects.");
          });
        setProjectsSent(userSentProjects);
      }
    };
    fetchProjectsReceived();
    fetchProjectsSent();
    setIsLoading(false);
  }, [companyId, API_URL, token, userId, updated]);

  return { projectsReceived, projectsSent, isLoading, error };
}
