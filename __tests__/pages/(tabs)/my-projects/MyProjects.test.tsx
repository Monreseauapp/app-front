import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import MyProjects from "@/app/(tabs)/my-projects/index/index";

jest.mock("axios");

const axios = require("axios");

describe("MyProjects", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", async () => {
    axios.get.mockResolvedValueOnce({ data: { received: [], sent: [] } });
    const { getByText } = render(<MyProjects />);
    await waitFor(() => {
      expect(getByText("Mes Projets")).toBeTruthy();
    });
  });

  it("shows empty message when no projects", async () => {
    axios.get.mockResolvedValueOnce({ data: { received: [], sent: [] } });
    const { getByText } = render(<MyProjects />);
    await waitFor(() => {
      expect(getByText(/Aucun projet/)).toBeTruthy();
    });
  });
});
