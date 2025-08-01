import { AppContext } from "@/context/context";
import { User } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function useFetchUserStatus() {
  const { API_URL, userId, companyId } = useContext(AppContext);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState<boolean | null>(
    null
  );
  const [hasActiveSubscription, setHasActiveSubscription] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStatus = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      if (companyId) {
        const company = await axios
          .get(`${API_URL}/company/${companyId}`)
          .then((response) => response.data)
          .catch(() => {
            setError("Failed to fetch company data.");
          });
        const subscription = await axios
          .get(`${API_URL}/subscription/company/${companyId}`)
          .then((res) => res.data)
          .catch((err) => {
            setError("Failed to fetch subscription data.");
          });
        setHasActiveSubscription(subscription.state === "ACTIVE");
        const user: User = await axios
          .get(`${API_URL}/users/${company.ownerId}`)
          .then((response) => response.data)
          .catch(() => {
            setError("Failed to fetch user data.");
          });
        setHasAgreedToTerms(user.consentTerms || false);
      } else {
        const user: User = await axios
          .get(`${API_URL}/users/${userId}`)
          .then((response) => response.data)
          .catch(() => {
            setError("Failed to fetch user data.");
          });
        setHasAgreedToTerms(user.consentTerms || false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, [userId, companyId]);

  return {
    hasAgreedToTerms,
    hasActiveSubscription,
    isLoading,
    error,
    refetch: fetchUserStatus,
  };
}
