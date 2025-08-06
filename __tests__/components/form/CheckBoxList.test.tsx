import CheckboxList from "@/components/form/CheckboxList";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/assets/icons/checkmark.svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="custom-checkbox-checkmark" />,
  };
});

describe("CheckBoxList", () => {
  it("renders correctly when not checked", () => {
    const choices = ["Choice 1", "Choice 2"];
    const { getByText, queryAllByTestId } = render(
      <CheckboxList
        title="Test Checkbox List"
        choices={choices}
        data={{}}
        field={"testField" as keyof {}}
        onChange={() => {}}
      />
    );
    expect(getByText("Test Checkbox List")).toBeTruthy();
    expect(getByText(/Choice 1/)).toBeTruthy();
    expect(getByText(/Choice 2/)).toBeTruthy();
    const checkbox = queryAllByTestId("custom-checkbox");
    expect(checkbox).toHaveLength(2);
  });

  it("updates checked state on checkbox press", () => {
    const choices = ["Choice 1", "Choice 2", "Choice 3"];
    const { queryAllByTestId, rerender } = render(
      <CheckboxList
        title="Test Checkbox List"
        choices={choices}
        data={{}}
        field={"testField" as keyof {}}
        onChange={(text: string) => {
          rerender(
            <CheckboxList
              title="Test Checkbox List"
              choices={choices}
              data={{}}
              field={"testField" as keyof {}}
              onChange={() => {}}
            />
          );
        }}
      />
    );
    const checkbox = queryAllByTestId("custom-checkbox");
    expect(checkbox).toHaveLength(3);
    const firstCheckbox = checkbox[0];
    const lastCheckbox = checkbox[2];
    fireEvent.press(firstCheckbox);
    fireEvent.press(lastCheckbox);
    const checkmarks = queryAllByTestId("custom-checkbox-checkmark");
    expect(checkmarks).toHaveLength(2);
  });
});
