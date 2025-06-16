import { createContext, useState } from "react";

export type AppContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

const AppContext = createContext<AppContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

function Context({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <AppContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
export default Context;
