import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import MyRecommendations from "@/app/(tabs)/my-recommendations/index/index";

jest.mock("axios");

const axios = require("axios");

describe("MyRecommendations", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", async () => {
    axios.get.mockResolvedValueOnce({ data: { received: [], sent: [] } });
    const { getByText } = render(<MyRecommendations />);
    await waitFor(() => {
      expect(getByText("Mes Recommandations")).toBeTruthy();
    });
  });

  it("shows empty message when no recommendations", async () => {
    axios.get.mockResolvedValueOnce({ data: { received: [], sent: [] } });
    const { getByText } = render(<MyRecommendations />);
    await waitFor(() => {
      expect(getByText(/Aucune recommandation/)).toBeTruthy();
    });
  });
});
