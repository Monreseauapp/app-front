import CustomCheckbox from "@/components/form/CustomCheckbox";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/assets/icons/checkmark.svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: () => <View testID="custom-checkbox-checkmark" />,
  };
});

describe("CustomCheckbox", () => {
  it("renders correctly when not checked", () => {
    const { queryByTestId, getByTestId } = render(
      <CustomCheckbox checked={false} onChange={() => {}} />
    );
    const checkbox = getByTestId("custom-checkbox");
    expect(checkbox).toBeTruthy();
    const checkmark = queryByTestId("custom-checkbox-checkmark");
    expect(checkmark).toBeNull();
  });

  it("renders correctly when checked", () => {
    let checked = false;
    const onChange = (value: boolean) => {
      checked = value;
    };
    const { queryByTestId, getByTestId, rerender } = render(
      <CustomCheckbox
        checked={checked}
        onChange={(value: boolean) => {
          onChange(value);
          rerender(<CustomCheckbox checked={value} onChange={onChange} />);
        }}
      />
    );
    const checkbox = getByTestId("custom-checkbox");
    expect(checkbox).toBeTruthy();
    fireEvent.press(checkbox);
    const checkmark = queryByTestId("custom-checkbox-checkmark");
    expect(checkmark).toBeTruthy();
  });
});
