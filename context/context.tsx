import { createContext, useState } from "react";

export type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  accountType: "company" | "guest" | null;
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  accountType: null,
});

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, accountType: null }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
