import Profil from "@/app/(tabs)/profil/index";
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
  updatedAt: "2025-07-16T13:36:45.418Z",
  lastLogin: "2025-07-16T13:36:45.418Z",
  phone: "0600000001",
  companyId: "comp1",
  isAdmin: true,
  twoFaSecret: null,
  retentionDate: "2028-07-21T11:40:36.827Z",
  consentTerms: true,
  consentMarketing: true,
  allowRecommendationDataAccess: false,
  company: {
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
  },
};

const reviews = [
  {
    id: "rev1",
    createdAt: "2025-07-16T13:36:45.605Z",
    updatedAt: "2025-07-16T13:36:45.605Z",
    rating: 5,
    comment:
      "It was great to work with Acme Corp on the website redesign. The team was professional and delivered ahead of schedule.",
    userId: "user1",
    projectId: "proj1",
    companyId: "comp1",
    retentionDate: null,
  },
];

jest.mock("@/assets/icons/linkedin.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));
jest.mock("@/assets/icons/mail.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));
jest.mock("@/assets/icons/phone.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));
jest.mock("@/assets/icons/star.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));
jest.mock("@/assets/icons/website.svg", () => ({
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
    useRouter: () => ({ push: jest.fn() }),
    useFocusEffect: (cb: any) => cb(),
  };
});

describe("Profil", () => {
  it("renders user profile without company data", async () => {
    const userWithoutCompany = { ...user, company: null };
    axios.get.mockImplementation((url: string) => {
      if (url.includes("/users/")) {
        return Promise.resolve({ data: userWithoutCompany });
      }
      return Promise.reject(new Error("Not Found"));
    });
    const { getByTestId } = render(
      <AppContext.Provider
        value={{ userId: "user1", API_URL: "http://localhost:3000" }}
      >
        <Profil />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByTestId("profile-picture")).toBeTruthy();
      expect(getByTestId("profile-name")).toHaveTextContent(
        `${userWithoutCompany.firstName} ${userWithoutCompany.lastName}`
      );
      expect(getByTestId("profile-company")).toHaveTextContent("");
      const modifyButton = getByTestId("modify-profile");
      fireEvent.press(modifyButton);
      expect(modifyButton.props.href).toBe("/profil/modify");
    });
  });
  it("renders user profile with company data", async () => {
    axios.get.mockImplementation((url: string) => {
      if (url.includes("/users/")) {
        return Promise.resolve({ data: user });
      } else if (url.includes("/review/")) {
        return Promise.resolve({ data: reviews });
      } else {
        return Promise.reject(new Error("Not Found"));
      }
    });
    const { getByTestId, getByText, getAllByTestId } = render(
      <AppContext.Provider
        value={{
          userId: "user1",
          companyId: "comp1",
          API_URL: "http://localhost:3000",
        }}
      >
        <Profil />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getByTestId("profile-company")).toHaveTextContent(
        user.company.name
      );
      expect(getAllByTestId("external-link")).toHaveLength(4);
      expect(getByText("Acme Corp")).toBeTruthy();
      expect(getByTestId("company-description")).toHaveTextContent(
        user.company.description
      );
      expect(getByText(reviews[0].comment)).toBeTruthy();
      expect(getAllByTestId("star-icon")).toHaveLength(5);
    });
  });
});
