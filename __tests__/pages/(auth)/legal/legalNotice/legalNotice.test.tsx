import LegalNotice from "@/app/(auth)/legal/legalNotice";
import { AppContext } from "@/context/context";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

jest.mock("axios");

const axios = require("axios");

const user = {
  id: "user1",
  linkedin: "https://linkedin.com/in/johnsmith",
  website: "https://johnsmith.dev",
  youtube: null,
  instagram: null,
  lastName: "Smith",
  firstName: "John",
  email: "john.smith@acme.com",
  photoUrl: null,
  jobTitle: "Lead Developer",
  address: "10 Rue de Paris",
  addressComplement: null,
  postalCode: 75001,
  city: "Paris",
  country: "France",
  createdAt: "2025-07-16T13:36:45.418Z",
  updatedAt: "2025-08-04T08:20:06.698Z",
  lastLogin: "2025-07-16T13:36:45.418Z",
  phone: "0600000001",
  password: "pw1",
  companyId: "comp1",
  isAdmin: true,
  twoFaSecret: null,
  retentionDate: "2028-07-21T11:40:36.827Z",
  consentTerms: true,
  consentMarketing: true,
  allowRecommendationDataAccess: false,
};

const company = {
  id: "comp1",
  name: "Acme Corp",
  address: "10 Rue de Paris",
  addressComplement: null,
  postalCode: 75001,
  stripeCustomerId: null,
  city: "Paris",
  country: "France",
  createdAt: "2025-07-16T13:36:45.450Z",
  updatedAt: "2025-07-16T13:36:45.450Z",
  recommendationRate: "4.8",
  email: "contact@acme.com",
  phone: "0100000001",
  website: "https://acme.com",
  photoUrl: null,
  description:
    "Acme Corp is a leading software engineering company specializing in scalable web applications.",
  domainId: null,
  linkedin: "https://linkedin.com/company/acme",
  SIRET: null,
  SIREN: null,
  subscriptionId: "sub1",
  ownerId: "user1",
  retentionDate: "2025-07-16T13:36:45.450Z",
  OpentoReco: true,
};

const mockPush = jest.fn();
let mockParams = {};
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useLocalSearchParams: () => mockParams,
}));

jest.mock("@/assets/icons/checkmark.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));

jest.mock("@/assets/icons/checkmark.svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="checkmark-svg" />,
  };
});

describe("Legal Notice", () => {
  it("renders legal notice page correctly", () => {
    const { getByText, getByTestId } = render(<LegalNotice />);
    expect(getByText("Validez les conditions d'accès.")).toBeTruthy();
    expect(getByText("Les mentions légales")).toBeTruthy();
    expect(getByTestId("legal-notice-text")).toBeTruthy();
    const validationButton = getByTestId("legal-notice-validation-button");
    expect(validationButton).toBeTruthy();
  });

  it("doesn't update user consent on validation press", async () => {
    const { getByTestId } = render(<LegalNotice />);
    const validationButton = getByTestId("legal-notice-validation-button");
    fireEvent.press(validationButton);
    expect(validationButton.props.accessibilityState?.disabled).toBe(true);
  });

  it("updates user consent on validation press", async () => {
    axios.patch.mockResolvedValueOnce({ data: user });
    const { getByTestId, queryByTestId } = render(
      <AppContext.Provider
        value={{ API_URL: "http://localhost:3000", userId: "user1" }}
      >
        <LegalNotice />
      </AppContext.Provider>
    );
    const checkbox = getByTestId("custom-checkbox");
    expect(queryByTestId("checkmark-svg")).toBeNull();
    fireEvent.press(checkbox);
    expect(queryByTestId("checkmark-svg")).toBeTruthy();
    const validationButton = getByTestId("legal-notice-validation-button");
    fireEvent.press(validationButton);
    expect(validationButton.props.accessibilityState?.disabled).toBe(false);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/signin");
    });
  });

  it("redirects to other pages and have email query param", async () => {
    axios.get.mockResolvedValueOnce({ data: company });
    axios.patch.mockResolvedValueOnce({ data: user });
    mockParams = {
      email: "john.smith@acme.com",
      redirect: "/home",
    };
    const { getByTestId, queryByTestId } = render(
      <AppContext.Provider
        value={{ API_URL: "http://localhost:3000", userId: "user1" }}
      >
        <LegalNotice />
      </AppContext.Provider>
    );
    const checkbox = getByTestId("custom-checkbox");
    expect(queryByTestId("checkmark-svg")).toBeNull();
    fireEvent.press(checkbox);
    expect(queryByTestId("checkmark-svg")).toBeTruthy();
    const validationButton = getByTestId("legal-notice-validation-button");
    fireEvent.press(validationButton);
    expect(validationButton.props.accessibilityState?.disabled).toBe(false);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/home");
    });
  });
});
