import SignUp from "@/app/(auth)/signup/index";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as ExpoRouter from "expo-router";

const mockPush = jest.fn();
const mockReplace = jest.fn();
let mockParams = {};
jest.mock("expo-router", () => ({
  useLocalSearchParams: () => mockParams,
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

describe("Signup", () => {
  it("renders for company signup", async () => {
    mockParams = { type: "company" };
    const { getByText, queryByTestId } = render(<SignUp />);
    await waitFor(() => {
      expect(getByText("PORTAIL ENTREPRISES")).toBeTruthy();
      expect(queryByTestId("signup-company-steps")).toBeTruthy();
      expect(queryByTestId("signup-guest-steps")).toBeNull();
    });
  });
  it("renders for guest signup", () => {
    mockParams = { type: "guest" };
    const { getByText, queryByTestId } = render(<SignUp />);
    expect(getByText("PORTAIL VISITEURS")).toBeTruthy();
    expect(queryByTestId("signup-guest-steps")).toBeTruthy();
    expect(queryByTestId("signup-company-steps")).toBeNull();
  });
  it("renders continue button that is clickable", () => {
    mockParams = { type: "company" };
    const { getByTestId } = render(<SignUp />);
    const signupButton = getByTestId("signup-continue-button");
    fireEvent.press(signupButton);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/signup/form",
      params: { type: "company" },
    });
  });
});
