import axios from "axios";
import { createContext, useEffect, useState } from "react";

export type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  accountType: "company" | "guest" | null;
  setAccountType: (type: "company" | "guest" | null) => void;
  API_URL?: string;
  userId?: string;
  setUserId?: (userId: string) => void;
  companyId?: string;
  setCompanyId?: (companyId: string) => void;
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  accountType: null,
  setAccountType: () => {},
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  userId: "user1",
  setUserId: () => {},
  companyId: undefined,
  setCompanyId: () => {},
});

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountType, setAccountType] = useState<"company" | "guest" | null>(
    null
  );
  const [userId, setUserId] = useState<string | undefined>("user1");
  const [companyId, setCompanyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        const user = response.data;
        if (user.companyId) {
          setAccountType("company");
          setCompanyId(user.companyId);
        } else {
          setAccountType("guest");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.request);
        setAccountType(null);
      });
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        accountType,
        setAccountType,
        API_URL,
        userId,
        setUserId,
        companyId,
        setCompanyId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
