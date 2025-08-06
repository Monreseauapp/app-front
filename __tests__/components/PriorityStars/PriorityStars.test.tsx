import PriorityStars from "@/components/PriorityStars";
import { Colors } from "@/constants/Colors";
import { render } from "@testing-library/react-native";

jest.mock("@/assets/icons/star.svg", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: (props: any) => <View testID="star-icon" {...props} />,
  };
});

const numberOfStars = 4;

describe("Priority Stars", () => {
  it("should render with correct parameters", () => {
    const { getAllByTestId } = render(
      <PriorityStars
        stars={numberOfStars}
        activeColor={Colors.white}
        inactiveColor={Colors.violet}
      />
    );
    const starIcons = getAllByTestId("star-icon");
    expect(starIcons).toHaveLength(5);
    starIcons.forEach((star, index) => {
      if (index < numberOfStars) {
        expect(star.props.color).toBe(Colors.white);
      } else {
        expect(star.props.color).toBe(Colors.violet);
      }
    });
  });
});
