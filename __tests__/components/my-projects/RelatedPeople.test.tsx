import RelatedPeople from "@/components/my-projects/RelatedPeople";
import { AppContext } from "@/context/context";
import { Company, User } from "@/types";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/assets/icons/right-arrow.svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="right-arrow-icon" />,
  };
});

jest.mock("expo-router", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    Link: ({ children, ...props }: { children: React.ReactNode }) => (
      <View {...props}>{children}</View>
    ),
  };
});

const mockContext = {
  userId: "user1",
};

describe("Related People", () => {
  const initiator: User & { company: Company } = {
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
    addressComplement: undefined,
    postalCode: 75001,
    city: "Paris",
    country: "France",
    createdAt: "2025-07-16T13:36:45.418Z",
    updatedAt: "2025-08-04T08:20:06.698Z",
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
      addressComplement: undefined,
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
      domainId: "",
      linkedin: "https://linkedin.com/company/acme",
      SIRET: "",
      SIREN: "",
      subscriptionId: "sub1",
      ownerId: "user1",
      retentionDate: "2025-07-16T13:36:45.450Z",
      OpentoReco: true,
    },
  };
  const company: Company = {
    id: "comp2",
    name: "Beta Ltd",
    address: "22 Avenue des Champs",
    addressComplement: undefined,
    postalCode: 69002,
    stripeCustomerId: null,
    city: "Lyon",
    country: "France",
    createdAt: "2025-07-16T13:36:45.450Z",
    updatedAt: "2025-07-16T13:36:45.450Z",
    recommendationRate: "4.5",
    email: "contact@beta.com",
    phone: "0100000002",
    website: "https://beta.com",
    photoUrl: null,
    description:
      "Beta Ltd delivers innovative marketing solutions for modern businesses.",
    domainId: "",
    linkedin: "https://linkedin.com/company/beta",
    SIRET: "",
    SIREN: "",
    subscriptionId: "sub2",
    ownerId: "user2",
    retentionDate: "2025-07-16T13:36:45.450Z",
    OpentoReco: true,
  };

  it("renders initiator and company names with correct style", () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={mockContext}>
        <RelatedPeople
          initiator={initiator}
          company={company}
          isCompanyReception={false}
        />
      </AppContext.Provider>
    );
    const initiatorName = getByText("John Smith");
    const companyName = getByText("Beta Ltd");
    expect(initiatorName).toBeTruthy();
    expect(companyName).toBeTruthy();
    expect(initiatorName).toHaveStyle({
      fontWeight: "bold",
    });
    expect(companyName).not.toHaveStyle({
      fontWeight: "bold",
    });
    expect(getByTestId("right-arrow-icon")).toBeTruthy();
  });

  it("renders clickable links for initiator and company", () => {
    const { getByTestId } = render(
      <AppContext.Provider value={mockContext}>
        <RelatedPeople
          initiator={initiator}
          company={company}
          isCompanyReception={false}
        />
      </AppContext.Provider>
    );
    const initiatorLink = getByTestId("initiator-link");
    const companyLink = getByTestId("company-link");
    fireEvent.press(initiatorLink);
    expect(initiatorLink.props.href).toEqual({
      pathname: "/profil/[id]",
      params: { id: initiator.id },
    });
    fireEvent.press(companyLink);
    expect(companyLink.props.href).toEqual({
      pathname: "/profil/[id]",
      params: { id: company.ownerId },
    });
  });
});
