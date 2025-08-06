import NavBar from "@/components/InnerNavBar";
import { Colors } from "@/constants/Colors";
import { fireEvent, render } from "@testing-library/react-native";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];
let activeIndex = 1;
const setActiveIndex = (index: number) => {
  activeIndex = index;
};

describe("Inner NavBar", () => {
  it("renders correctly with given props", () => {
    const { getByText, getAllByTestId } = render(
      <NavBar
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    );
    expect(getByText("Tab 1")).toBeTruthy();
    expect(getByText("Tab 2")).toBeTruthy();
    expect(getByText("Tab 3")).toBeTruthy();
    const navbarButtons = getAllByTestId("navbar-button");
    expect(navbarButtons).toHaveLength(3);
    expect(navbarButtons[0]).toHaveStyle({
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    });
    expect(navbarButtons[2]).toHaveStyle({
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    });
  });

  it("changes correctly active tab", () => {
    activeIndex = 1;
    const { getAllByTestId, rerender } = render(
      <NavBar
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={(index: number) => {
          setActiveIndex(index);
          rerender(
            <NavBar
              tabs={tabs}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          );
        }}
      />
    );
    const navbarButtons = getAllByTestId("navbar-button");
    expect(navbarButtons[1]).toHaveStyle({
      backgroundColor: Colors.white,
    });
    fireEvent.press(navbarButtons[0]);
    expect(navbarButtons[0]).toHaveStyle({
      backgroundColor: Colors.white,
    });
    expect(activeIndex).toBe(0);
  });
});
