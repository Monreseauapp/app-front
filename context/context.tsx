import { createContext, useState } from "react";

export type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  accountType: "company" | "guest" | null;
  setAccountType: (type: "company" | "guest" | null) => void;
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  accountType: null,
  setAccountType: () => {},
});

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountType, setAccountType] = useState<"company" | "guest" | null>(
    null
  );
  return (
    <AppContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, accountType, setAccountType }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
