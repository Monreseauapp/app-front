import AddressInputs from "@/components/AddressInputs";
import { fireEvent, render } from "@testing-library/react-native";

describe("Address Inputs", () => {
  const data = {
    address: "1 rue de Paris",
    addressComplement: "Apt 2",
    city: "Paris",
    postalCode: "75000",
    country: "France",
  };

  it("renders all input fields with correct values", () => {
    const { getByPlaceholderText } = render(
      <AddressInputs data={data} handleChange={jest.fn()} />
    );
    expect(
      getByPlaceholderText("18 avenue des Champs-Élysées").props.value
    ).toBe("1 rue de Paris");
    expect(getByPlaceholderText("Apt 42").props.value).toBe("Apt 2");
    expect(getByPlaceholderText("Paris").props.value).toBe("Paris");
    expect(getByPlaceholderText("75000").props.value).toBe("75000");
    expect(getByPlaceholderText("France").props.value).toBe("France");
  });

  it("calls handleChange with correct field and value", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <AddressInputs data={data} handleChange={handleChange} />
    );
    fireEvent.changeText(getByPlaceholderText("Paris"), "Lille");
    expect(handleChange).toHaveBeenCalledWith("city", "Lille");
    fireEvent.changeText(getByPlaceholderText("75000"), "59000");
    expect(handleChange).toHaveBeenCalledWith("postalCode", 59000);
  });
});
