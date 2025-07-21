import { AppContext } from "@/context/context";
import { Recommandation } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function useRecommendationFetch(updated?: boolean) {
  const { API_URL, userId, companyId, token } = useContext(AppContext);
  const [recommendationsInitiated, setRecommendationsInitiated] = useState<
    Recommandation[]
  >([]);
  const [recommendationsReceived, setRecommendationsReceived] = useState<
    Recommandation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;
    setLoading(true);
    setError(null);
    const fetchRecommendations = async () => {
      try {
        if (companyId) {
          const companyReceivedRecommendations = await Promise.all([
            axios
              .get(`${API_URL}/recommandation/company-recipients/${companyId}`)
              .then((response) => response.data)
              .catch((error) => {
                console.error("Error fetching recommendations:", error.request);
              }),

            axios
              .get(`${API_URL}/recommandation/company/${companyId}`)
              .then((response) => response.data)
              .catch((error) => {
                console.error("Error fetching recommendations:", error.request);
              }),
          ]);
          const companyInitiatedRecommendations = await axios
            .get(`${API_URL}/recommandation/company-initiators/${companyId}`)
            .then((response) => response.data)
            .catch((error) => {
              console.error("Error fetching recommendations:", error.request);
            });
          setRecommendationsReceived(companyReceivedRecommendations);
          setRecommendationsInitiated(companyInitiatedRecommendations);
        } else {
          const userInitiatedRecommendations = await axios
            .get(`${API_URL}/recommandation/initiator/${userId}`)
            .then((res) => res.data);

          const userReceivedRecommendations = await axios
            .get(`${API_URL}/recommandation/recipient/${userId}`)
            .then((res) => res.data);
          setRecommendationsInitiated(userInitiatedRecommendations);
          setRecommendationsReceived(userReceivedRecommendations);
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to fetch recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [API_URL, userId, companyId, token, updated]);
  return {
    recommendationsInitiated,
    recommendationsReceived,
    loading,
    error,
  };
}
