import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  API_URL?: string;
  userId?: string | null;
  token?: string | null;
  setToken: (token: string, expires: number) => void;
  companyId?: string;
  setCompanyId?: (companyId: string) => void;
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  userId: undefined,
  token: null,
  setToken: () => {},
  companyId: undefined,
  setCompanyId: () => {},
});

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  const [companyId, setCompanyId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  axios.defaults.headers.common["x-api-key"] = API_KEY;

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const tokenExpires = await AsyncStorage.getItem("tokenExpires");
      if (tokenExpires && Date.now() > parseInt(tokenExpires)) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("tokenExpires");
        setToken(null);
        setUserId(null);
        return;
      }
      if (storedToken) {
        try {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
          const tokenParts = storedToken.split(".");
          if (tokenParts.length !== 3) {
            throw new Error("Invalid token format");
          }
          const payloadBase64 = tokenParts[1];
          const payloadJson = atob(payloadBase64);
          const payload = JSON.parse(payloadJson);
          const id = payload.id as string | undefined;
          if (id) {
            axios
              .patch(`${API_URL}/users/${id}`, {
                lastLogin: new Date().toISOString(),
              })
              .catch((error) => {
                console.error("Error updating last login:", error.response);
              });
            setUserId(id);
            setToken(storedToken);
          }
        } catch (error) {
          console.error("Error parsing token:", error);
          setUserId(null);
        }
      } else {
        setUserId(null);
      }
    };
    loadToken();
  }, [token]);

  useEffect(() => {
    const fetchCompanyId = async () => {
      axios
        .get(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data;
          setCompanyId(user.companyId);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.request);
        });
    };
    if (userId && token) {
      fetchCompanyId();
    }
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        API_URL,
        userId,
        companyId,
        setCompanyId,
        token,
        setToken: (newToken: string, expires: number) => {
          setToken(newToken);
          AsyncStorage.setItem("token", newToken);
          AsyncStorage.setItem(
            "tokenExpires",
            String(Date.now() + parseInt(String(expires)) * 1000)
          );
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
