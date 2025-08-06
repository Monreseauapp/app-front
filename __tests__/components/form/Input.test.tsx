import Input from "@/components/form/Input";
import { Colors } from "@/constants/Colors";
import { fireEvent, render } from "@testing-library/react-native";

describe("Input", () => {
  it("renders placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <Input type="off" placeholder="Test" />
    );
    expect(getByPlaceholderText("Test")).toBeTruthy();
  });

  it("renders title and error message when provided", () => {
    const { getByText } = render(
      <Input
        type="off"
        name="Test Title"
        placeholder="Test"
        validationMessage="Test Validation Message"
        valid={false}
        incorrectMessage="Test Error Message"
        isDataCorrect={false}
      />
    );
    expect(getByText("*")).toBeTruthy();
    expect(getByText(/Test Title/)).toBeTruthy();
    expect(getByText(/Test Validation Message/)).toBeTruthy();
    expect(getByText(/Test Error Message/)).toBeTruthy();
  });

  it("renders multiple line correctly", () => {
    const { getByPlaceholderText } = render(
      <Input type="off" placeholder="Test" multiline={true} />
    );
    expect(getByPlaceholderText("Test")).toHaveStyle({
      height: 100,
    });
  });

  it("computes key press correctly", () => {
    let value = "Test Value Before Change";
    const { getByPlaceholderText, rerender } = render(
      <Input
        type="off"
        placeholder="Test"
        value={value}
        onChangeText={(text: string) => {
          value = text;
          rerender(
            <Input
              type="off"
              placeholder="Test"
              value={value}
              onChangeText={() => {}}
            />
          );
        }}
      />
    );
    const input = getByPlaceholderText("Test");
    expect(input.props.value).toBe("Test Value Before Change");
    fireEvent.changeText(input, "Test Value After Change");
    expect(input.props.value).toBe("Test Value After Change");
  });

  it("limits input length when limit is set", () => {
    const { getByPlaceholderText, rerender } = render(
      <Input
        type="off"
        placeholder="Test"
        value=""
        limit={4}
        onChangeText={(text: string) => {
          rerender(
            <Input
              type="off"
              placeholder="Test"
              value={text}
              onChangeText={() => {}}
            />
          );
        }}
      />
    );
    const input = getByPlaceholderText("Test");
    fireEvent.changeText(input, "Test Value");
    expect(input.props.value).toBe("Test");
  });

  it("renders with correct keyboard type based on input type", () => {
    const { getByPlaceholderText: getByPlaceholderTextEmail } = render(
      <Input type="email" placeholder="Email" />
    );
    const input = getByPlaceholderTextEmail("Email");
    expect(input.props.keyboardType).toBe("email-address");
    const { getByPlaceholderText: getByPlaceholderTextTel } = render(
      <Input type="tel" placeholder="Phone" />
    );
    const inputTel = getByPlaceholderTextTel("Phone");
    expect(inputTel.props.keyboardType).toBe("phone-pad");
    const { getByPlaceholderText: getByPlaceholderTextNumeric } = render(
      <Input type="postal-code" placeholder="Postal Code" />
    );
    const inputNumeric = getByPlaceholderTextNumeric("Postal Code");
    expect(inputNumeric.props.keyboardType).toBe("numeric");
  });

  it("renders with custome styles", () => {
    const titleStyle = { color: Colors.red };
    const inputStyle = { backgroundColor: Colors.green };
    const { getByText, getByPlaceholderText } = render(
      <Input
        name="Test Title"
        type="off"
        placeholder="Test"
        inputStyle={inputStyle}
        titleStyle={titleStyle}
      />
    );
    const title = getByText("Test Title");
    const input = getByPlaceholderText("Test");
    expect(title).toHaveStyle(titleStyle);
    expect(input).toHaveStyle(inputStyle);
  });
});
