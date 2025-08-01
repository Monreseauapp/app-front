import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import MyRecommendations from "@/app/(tabs)/my-recommendations/index/index";
import { AppContext } from "@/context/context";

// jest.mock("@/components/InnerNavBar", () => "InnerNavBar");
// jest.mock(
//   "@/components/my-recommendations/Recommendation",
//   () => "Recommendation"
// );

const mockContextValue = {
  API_URL: "http://localhost:3000",
  userId: "user1",
};

describe("MyRecommendations", () => {
  it("renders the title", () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <MyRecommendations />
      </AppContext.Provider>
    );

    expect(getByText("Mes Recommandations")).toBeTruthy();
  });

  it("shows empty message when no recommendations", () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <MyRecommendations />
      </AppContext.Provider>
    );

    expect(getByText(/Aucune recommandation/)).toBeTruthy();
  });
});
