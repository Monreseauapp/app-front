import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import RecommendationChoice from "@/app/(tabs)/recommendation/index";

jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Link: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
  };
});

describe("RecommendationChoice", () => {
  it("renders title", async () => {
    const { getByText } = render(<RecommendationChoice />);
    await waitFor(() => {
      expect(getByText("JE DEPOSE UNE RECOMMANDATION")).toBeTruthy();
    });
  });
  it("renders buttons", async () => {
    const { getByText } = render(<RecommendationChoice />);
    await waitFor(() => {
      expect(getByText("Je recommande")).toBeTruthy();
      expect(getByText("J'apporte un prospect")).toBeTruthy();
      expect(getByText("Je dépose un projet")).toBeTruthy();
    });
  });
  it("buttons are clickable", () => {
    const { getByTestId } = render(<RecommendationChoice />);
    const recommendBtn = getByTestId("recommendation-company-button");
    fireEvent.press(recommendBtn);
    expect(recommendBtn.props.href).toBe("/recommendation/form?type=company");
    const leadBtn = getByTestId("recommendation-lead-button");
    fireEvent.press(leadBtn);
    expect(leadBtn.props.href).toBe("/recommendation/form?type=lead");
    const projectBtn = getByTestId("recommendation-project-button");
    fireEvent.press(projectBtn);
    expect(projectBtn.props.href).toBe("/recommendation/form?type=project");
  });
});
