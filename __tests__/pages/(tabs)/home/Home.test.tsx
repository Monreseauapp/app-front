import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { AppContext } from "@/context/context";
import Home from "@/app/(tabs)/home";

jest.mock("axios");

const axios = require("axios");

jest.mock("@/assets/icons/notification.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));

jest.mock("@/assets/icons/plus.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Link: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
  };
});

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders notification button", () => {
    const { getByTestId } = render(<Home />);
    const notificationButton = getByTestId("notification-link");
    expect(notificationButton).toBeTruthy();
    fireEvent.press(notificationButton);
    expect(notificationButton.props.href).toBe("/notification");
  });

  it("renders page without companyId", async () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    const { getByText } = render(
      <AppContext.Provider value={{ companyId: undefined }}>
        <Home />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByText("MON PROFIL")).toBeTruthy();
      expect(getByText("MON TABLEAU DE BORD")).toBeTruthy();
      expect(getByText("Modifier mon profil")).toBeTruthy();
      expect(getByText("Mes 5 dernières actualités")).toBeTruthy();
    });
  });

  it("renders page with companyId", async () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    const { getByText, queryByText } = render(
      <AppContext.Provider value={{ companyId: "comp1" }}>
        <Home />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(queryByText("MON PROFIL")).toBeNull();
      expect(getByText("MON TABLEAU DE BORD")).toBeTruthy();
      expect(queryByText("Modifier mon profil")).toBeNull();
      expect(getByText("Mes 5 dernières actualités")).toBeTruthy();
    });
  });
});
