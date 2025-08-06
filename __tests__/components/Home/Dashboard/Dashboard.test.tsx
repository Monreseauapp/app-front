import Dashboard from "@/components/Home/Dashboard";
import { AppContext } from "@/context/context";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

jest.mock("axios");

const axios = require("axios");

jest.mock("@/components/Home/Dashboard/DashboardStats", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="dashboard-item" />,
  };
});

jest.mock("@/assets/icons/plus.svg", () => ({
  __esModule: true,
  default: () => <></>,
}));

let mockContext = {};

const recommendationSent = {
  data: [
    {
      id: "rec1",
      createdAt: "2025-07-16T13:36:45.510Z",
      updatedAt: "2025-07-16T13:36:45.510Z",
      priority: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@acme.com",
      phone: "0600000011",
      address: "10 Rue de Paris",
      addressComplement: null,
      postalCode: 75001,
      city: "Paris",
      country: null,
      companyName: null,
      companyAddress: null,
      companyAddressComplement: null,
      companyPostalCode: null,
      companyCity: null,
      companyCountry: null,
      companyEmail: null,
      companyPhone: null,
      companyJobDomain: null,
      description:
        "Alice consistently delivered high-quality work and was a pleasure to collaborate with.",
      startDate: "2025-07-16T13:36:45.510Z",
      inProgressAt: "2025-07-16T13:36:45.510Z",
      endDate: "2025-07-16T13:36:45.510Z",
      isAccepted: true,
      RecoStateRecipient: "ACCEPTED",
      rejectionReasonRecipient: null,
      RecoStateCompany: "ACCEPTED",
      rejectionReasonCompany: null,
      companyId: "comp1",
      initiatorId: "user1",
      recipientId: "user2",
      retentionDate: null,
    },
  ],
};

const recommendationReceived = {
  data: [
    {
      id: "rec5",
      createdAt: "2025-07-17T13:36:45.510Z",
      updatedAt: "2025-07-17T13:36:45.510Z",
      priority: 5,
      firstName: "Eve",
      lastName: "Black",
      email: "eve.black@epsilon.com",
      phone: "0600000015",
      address: "15 Rue du Capitole",
      addressComplement: null,
      postalCode: 31000,
      city: "Toulouse",
      country: null,
      companyName: null,
      companyAddress: null,
      companyAddressComplement: null,
      companyPostalCode: null,
      companyCity: null,
      companyCountry: null,
      companyEmail: null,
      companyPhone: null,
      companyJobDomain: null,
      description:
        "Eve is a dedicated HR specialist who always puts people first.",
      startDate: "2025-07-16T13:36:45.510Z",
      inProgressAt: "2025-07-16T13:36:45.510Z",
      endDate: "2025-07-16T13:36:45.510Z",
      isAccepted: true,
      RecoStateRecipient: "ACCEPTED",
      rejectionReasonRecipient: null,
      RecoStateCompany: "ACCEPTED",
      rejectionReasonCompany: null,
      companyId: "comp5",
      initiatorId: "user5",
      recipientId: "user1",
      retentionDate: null,
    },
  ],
};

const companyRecommendation = {
  data: [
    {
      id: "rec6",
      createdAt: "2025-07-16T13:36:45.510Z",
      updatedAt: "2025-07-16T13:36:45.510Z",
      priority: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@acme.com",
      phone: "0600000011",
      address: "10 Rue de Paris",
      addressComplement: null,
      postalCode: 75001,
      city: "Paris",
      country: null,
      companyName: null,
      companyAddress: null,
      companyAddressComplement: null,
      companyPostalCode: null,
      companyCity: null,
      companyCountry: null,
      companyEmail: null,
      companyPhone: null,
      companyJobDomain: null,
      description:
        "Alice consistently delivered high-quality work and was a pleasure to collaborate with.",
      startDate: "2025-07-16T13:36:45.510Z",
      inProgressAt: "2025-07-16T13:36:45.510Z",
      endDate: "2025-07-16T13:36:45.510Z",
      isAccepted: true,
      RecoStateRecipient: "ACCEPTED",
      rejectionReasonRecipient: null,
      RecoStateCompany: "ACCEPTED",
      rejectionReasonCompany: null,
      companyId: "comp1",
      initiatorId: "user6",
      recipientId: "user2",
      retentionDate: null,
    },
  ],
};

axios.get.mockImplementation((url: string) => {
  if (url.includes("/recommandation/initiator")) {
    return Promise.resolve(recommendationSent);
  } else if (url.includes("/recommandation/recipient")) {
    return Promise.resolve(recommendationReceived);
  } else if (url.includes("/recommandation/company")) {
    return Promise.resolve(companyRecommendation);
  } else {
    return Promise.reject(new Error("Unknown URL"));
  }
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

describe("Dashboard", () => {
  it("should render title and items correctly without companyId", async () => {
    mockContext = {
      userId: "user1",
      token: "test-token",
    };
    const { getByText, getByTestId, queryAllByTestId } = render(
      <AppContext.Provider value={mockContext}>
        <Dashboard />
      </AppContext.Provider>
    );
    expect(getByText("MON TABLEAU DE BORD")).toBeTruthy();
    const addButton = getByTestId("add-recommendation-button");
    expect(addButton).toBeTruthy();
    fireEvent.press(addButton);
    expect(addButton.props.href).toBe("/recommendation");
    await waitFor(() => {
      expect(queryAllByTestId("dashboard-item")).toHaveLength(1);
    });
  });

  it("should render title and items correctly with companyId", async () => {
    mockContext = {
      userId: "user1",
      companyId: "comp1",
      token: "test-token",
    };
    const { getByText, getByTestId, queryAllByTestId, queryByTestId } = render(
      <AppContext.Provider value={mockContext}>
        <Dashboard />
      </AppContext.Provider>
    );
    expect(getByText("MON TABLEAU DE BORD")).toBeTruthy();
    expect(queryByTestId("add-recommendation-button")).toBeNull();
    await waitFor(() => {
      expect(queryAllByTestId("dashboard-item")).toHaveLength(3);
    });
  });
});
