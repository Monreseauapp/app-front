import Search from "@/components/form/Search/Search";
import { fireEvent, render } from "@testing-library/react-native";

const [list, placeholder] = [["apple", "banana", "cherry"], "Search..."];

describe("Search", () => {
  it("renders correctly title, input and error message", () => {
    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <Search name="test" list={list} placeholder={placeholder} valid={false} />
    );
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
    expect(getByText(/test/)).toBeTruthy();
    expect(getByText("*")).toBeTruthy();
    expect(getByText(/(ce champ est requis)/)).toBeTruthy();
    expect(queryByTestId("search-input")).toBeTruthy();
    expect(queryByTestId("search-list")).toBeNull();
  });

  it("updates search term on input change", () => {
    let value = "";
    const onChangeText = (text: string) => {
      value = text;
    };
    const { getByTestId, rerender } = render(
      <Search
        name="test"
        list={list}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          rerender(
            <Search
              name="test"
              list={list}
              placeholder={placeholder}
              value={value}
            />
          );
        }}
      />
    );
    const input = getByTestId("search-input");
    fireEvent.changeText(input, "New search term");
    expect(value).toBe("New search term");
  });

  it("filters list based on input value", () => {
    let value = "a";
    const onChangeText = (text: string) => {
      value = text;
    };
    const { getAllByTestId, getByText, rerender, queryByText } = render(
      <Search
        autoFocus={true}
        name="test"
        list={list}
        placeholder={placeholder}
        value="a"
        onChangeText={(text: string) => {
          onChangeText(text);
          rerender(
            <Search
              autoFocus={true}
              name="test"
              list={list}
              placeholder={placeholder}
              value={value}
            />
          );
        }}
      />
    );
    const items = getAllByTestId("search-item");
    expect(items).toHaveLength(2);
    expect(getByText("apple")).toBeTruthy();
    expect(getByText("banana")).toBeTruthy();
    expect(queryByText("cherry")).toBeNull();
    fireEvent.press(items[0]);
    expect(value).toBe("apple");
  });
});
