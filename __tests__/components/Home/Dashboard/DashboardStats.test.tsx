import DashboardStats, {
  Stat,
} from "@/components/Home/Dashboard/DashboardStats";
import { render } from "@testing-library/react-native";

const stats: [Stat, Stat] = [
  { label: "Envoyées", value: 20 },
  { label: "Reçues", value: 1 },
];

describe("Dashboard Stats", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <DashboardStats title="Test Title" stats={stats} />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText(/Envoyées/)).toBeTruthy();
    expect(getByText(/Reçues/)).toBeTruthy();
    expect(getByText(/20/)).toBeTruthy();
    expect(getByText(/1/)).toBeTruthy();
  });
});
