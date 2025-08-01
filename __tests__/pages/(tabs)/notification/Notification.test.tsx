import NotificationPage from "@/app/(tabs)/notification";
import { render, waitFor } from "@testing-library/react-native";
import { AppContext } from "@/context/context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

jest.mock("axios");

const axios = require("axios");

const mockContextValue = {
  userId: "user1",
  companyId: "comp1",
  token: "mockToken",
};

describe("Notification Page", () => {
  it("renders the title", () => {
    const { getByText } = render(<NotificationPage />);
    expect(getByText("MON ACTUALITE")).toBeTruthy();
  });

  it("renders the notification list", async () => {
    axios.get.mockImplementation((url: string) => {
      if (url.includes("/recommandation/initiator")) {
        return Promise.resolve({
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
        });
      } else if (url.includes("/recommandation/recipient")) {
        return Promise.resolve({
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
        });
      } else if (url.includes("/recommandation/company")) {
        return Promise.resolve({
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
        });
      } else if (url.includes("/project/user")) {
        return Promise.resolve({
          data: [
            {
              id: "proj1",
              createdAt: "2025-07-16T13:36:45.546Z",
              updatedAt: "2025-07-16T14:36:45.546Z",
              name: "Website Redesign",
              description:
                "Redesign of the corporate website to improve UX and performance.",
              startDate: "2025-07-16T13:36:45.546Z",
              endDate: "2025-08-16T13:36:45.546Z",
              priority: 1,
              isPublic: true,
              companyNumber: null,
              companyId: "comp1",
              companyName: null,
              companyAddress: null,
              companyAddressComplement: null,
              companyPostalCode: null,
              companyCity: null,
              companyCountry: null,
              companyEmail: null,
              companyPhone: null,
              companyJobDomain: null,
              ProjectState: "COMPLETED",
              ProjectChoiceCompany: "ACCEPTED",
              rejectionReasonCompany: null,
              userId: "user1",
              retentionDate: null,
            },
          ],
        });
      } else if (url.includes("/project/company")) {
        return Promise.resolve({
          data: [
            {
              id: "proj1",
              createdAt: "2025-07-16T13:36:45.546Z",
              updatedAt: "2025-07-16T13:36:45.546Z",
              name: "Website Redesign",
              description:
                "Redesign of the corporate website to improve UX and performance.",
              startDate: "2025-07-16T13:36:45.546Z",
              endDate: "2025-08-16T13:36:45.546Z",
              priority: 1,
              isPublic: true,
              companyNumber: null,
              companyId: "comp1",
              companyName: null,
              companyAddress: null,
              companyAddressComplement: null,
              companyPostalCode: null,
              companyCity: null,
              companyCountry: null,
              companyEmail: null,
              companyPhone: null,
              companyJobDomain: null,
              ProjectState: "COMPLETED",
              ProjectChoiceCompany: "ACCEPTED",
              rejectionReasonCompany: null,
              userId: "user1",
              retentionDate: null,
            },
          ],
        });
      }
    });
    const { getAllByTestId } = render(
      <AppContext.Provider value={mockContextValue}>
        <NotificationPage />
      </AppContext.Provider>
    );
    await waitFor(() => {
      expect(getAllByTestId("notification-date-container")).toHaveLength(2);
      expect(getAllByTestId("notification-item")).toHaveLength(5);
      const sentRecommendations = getAllByTestId("notification-item").filter(
        (item) =>
          item.props.children.includes("Vous avez initié une recommandation.")
      );
      expect(sentRecommendations).toHaveLength(2);
      const receivedRecommendations = getAllByTestId(
        "notification-item"
      ).filter((item) =>
        item.props.children.includes("Vous avez reçu une recommandation.")
      );
      expect(receivedRecommendations).toHaveLength(1);
      const sentUpdatedProjects = getAllByTestId("notification-item").filter(
        (item) =>
          item.props.children.includes(
            "Un projet que vous avez initié a été mis à jour !"
          )
      );
      expect(sentUpdatedProjects).toHaveLength(1);
      const sentProjects = getAllByTestId("notification-item").filter((item) =>
        item.props.children.includes("Vous avez initié un projet.")
      );
      expect(sentProjects).toHaveLength(1);
    });
  });
});
