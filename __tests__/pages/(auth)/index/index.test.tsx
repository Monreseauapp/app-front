import Index from "@/app/(auth)/index";
import { fireEvent, render } from "@testing-library/react-native";

const mockPush = jest.fn();
jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Link: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
    useRouter: () => ({ push: mockPush }),
  };
});

describe("index", () => {
  it("renders index page with clickable buttons", () => {
    const { getByTestId, getByText } = render(<Index />);
    const logo = getByTestId("logo");
    expect(logo).toBeTruthy();
    expect(getByText("Je m'inscris")).toBeTruthy();
    expect(getByText("(inscription obligatoire)")).toBeTruthy();
    const companyButton = getByTestId("company-button");
    fireEvent.press(companyButton);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/signup",
      params: { type: "company" },
    });
    const guestButton = getByTestId("guest-button");
    fireEvent.press(guestButton);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/signup",
      params: { type: "guest" },
    });
    const loginButton = getByTestId("login-button");
    fireEvent.press(loginButton);
    expect(loginButton.props.href).toBe("/signin");
  });
});
