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
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  accountType: null,
  setAccountType: () => {},
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  userId: "user1",
  setUserId: () => {},
});

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountType, setAccountType] = useState<"company" | "guest" | null>(
    null
  );
  const [userId, setUserId] = useState<string | undefined>("user1");

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        const user = response.data;
        if (user.companyId) {
          setAccountType("company");
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
