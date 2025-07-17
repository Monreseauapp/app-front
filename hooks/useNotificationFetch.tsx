import { AppContext } from "@/context/context";
import { Project, Recommandation } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function useNotificationFetch() {
  const { API_URL, userId, companyId, token } = useContext(AppContext);
  const [recommendationsInitiated, setRecommendationsInitiated] = useState<
    Recommandation[]
  >([]);
  const [recommendationsReceived, setRecommendationsReceived] = useState<
    Recommandation[]
  >([]);
  const [companyRecommendations, setCompanyRecommendations] = useState<
    Recommandation[]
  >([]);
  const [projectsInitiated, setProjectsInitiated] = useState<Project[]>([]);
  const [projectsReceived, setProjectsReceived] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    const fetchRecommendations = async () => {
      const initiatedRecommendations = await axios
        .get(`${API_URL}/recommandation/initiator/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error("Error fetching initiated recommendations:", err);
          setError("Failed to fetch initiated recommendations.");
        });
      const receivedRecommendations = await axios
        .get(`${API_URL}/recommandation/recipient/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error("Error fetching received recommendations:", err);
          setError("Failed to fetch received recommendations.");
        });
      if (companyId) {
        const companyReceivedRecommendations = await axios
          .get(`${API_URL}/recommandation/company/${companyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => {
            console.error("Error fetching company recommendations:", err);
            setError("Failed to fetch company recommendations.");
          });
        setCompanyRecommendations(companyReceivedRecommendations);
      }
      setRecommendationsInitiated(initiatedRecommendations);
      setRecommendationsReceived(receivedRecommendations);
    };
    const fetchProjects = async () => {
      const initiatedProjects = await axios
        .get(`${API_URL}/project/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error("Error fetching initiated projects:", err);
          setError("Failed to fetch initiated projects.");
        });
      if (companyId) {
        const receivedProjects = await axios
          .get(`${API_URL}/project/company/${companyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => {
            console.error("Error fetching received projects:", err);
            setError("Failed to fetch received projects.");
          });
        setProjectsReceived(receivedProjects);
      }
      setProjectsInitiated(initiatedProjects);
    };
    fetchRecommendations();
    fetchProjects();
    setLoading(false);
  }, [userId, companyId, API_URL, token]);

  return {
    recommendationsInitiated,
    recommendationsReceived,
    companyRecommendations,
    projectsInitiated,
    projectsReceived,
    loading,
    error,
  };
}
