import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import RecommendationForm from "@/app/(tabs)/recommendation/form";
import { AppContext } from "@/context/context";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

jest.mock("@/components/recommendation/CompanyInformations", () => () => <></>);
jest.mock("@/components/recommendation/CompanyNumber", () => () => <></>);
jest.mock("@/components/recommendation/DetailsInput", () => () => <></>);
jest.mock("@/components/recommendation/PriorityStars", () => () => <></>);
jest.mock("@/components/recommendation/UserInformations", () => () => <></>);
jest.mock("@/components/recommendation/ValidateForm", () => () => <></>);

const mockContextValue = {
  API_URL: "http://localhost:3000",
  userId: "user1",
};

describe("RecommendationForm", () => {
  it("renders company recommendation title", async () => {
    jest
      .spyOn(require("expo-router"), "useLocalSearchParams")
      .mockReturnValue({ type: "company" });
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <RecommendationForm />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByText("JE RECOMMANDE")).toBeTruthy();
    });
  });

  it("renders lead recommendation title", async () => {
    jest
      .spyOn(require("expo-router"), "useLocalSearchParams")
      .mockReturnValue({ type: "lead" });
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <RecommendationForm />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByText("J'APPORTE UN PROSPECT")).toBeTruthy();
    });
  });

  it("renders project recommendation title", async () => {
    jest
      .spyOn(require("expo-router"), "useLocalSearchParams")
      .mockReturnValue({ type: "project" });
    const { getByText } = render(
      <AppContext.Provider value={mockContextValue}>
        <RecommendationForm />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByText("JE DEPOSE UN PROJET")).toBeTruthy();
    });
  });
});
