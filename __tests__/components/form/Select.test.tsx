import Select from "@/components/form/Select";
import { fireEvent, render } from "@testing-library/react-native";

describe("Select", () => {
  it("renders title and error message when provided", () => {
    const { getByText } = render(
      <Select title="Test Title" valid={false} choices={[]} />
    );
    expect(getByText("*")).toBeTruthy();
    expect(getByText(/Test Title/)).toBeTruthy();
    expect(getByText(/(ce champ est requis)/)).toBeTruthy();
  });

  it("renders choices and selected correctly", () => {
    const choices = ["Choice 1", "Choice 2", "Choice 3"];
    let selected = "Choice 1";
    const setSelected = (value: string) => {
      selected = value;
    };
    const { getByTestId } = render(
      <Select
        title="Test Select"
        choices={choices}
        selected={selected}
        setSelected={setSelected}
      />
    );
    const picker = getByTestId("select-picker");
    expect(picker).toBeTruthy();
    fireEvent(picker, "valueChange", "Choice 2");
    expect(selected).toBe("Choice 2");
  });
});
