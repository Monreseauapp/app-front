import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return {
    passwordVisibility,
    handlePasswordVisibility,
  };
};
