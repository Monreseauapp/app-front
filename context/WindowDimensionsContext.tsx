import { createContext, useContext, useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

const WindowDimensionsContext = createContext({ width: 0, height: 0 });

import { ReactNode } from "react";

export const WindowDimensionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) =>
      setDimensions(window);
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove?.();
  }, []);

  return (
    <WindowDimensionsContext.Provider value={dimensions}>
      {children}
    </WindowDimensionsContext.Provider>
  );
};

export const useWindowDimensionsContext = () =>
  useContext(WindowDimensionsContext);
