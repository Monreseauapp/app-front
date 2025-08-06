import ValidationForm from "@/components/ValidationForm";
import { Colors } from "@/constants/Colors";
import { fireEvent, render } from "@testing-library/react-native";

describe("Validation Form", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ValidationForm
        isRejected={undefined}
        setIsRejected={jest.fn()}
        rejectionReason=""
        setRejectionReason={jest.fn()}
        update={jest.fn()}
        setUpdated={jest.fn()}
      />
    );
    expect(getByText("Vous n'avez toujours pas fait de choix !")).toBeTruthy();
    expect(getByText("Souhaitez vous :")).toBeTruthy();
    expect(getByText("ACCEPTER")).toBeTruthy();
    expect(getByText("REFUSER")).toBeTruthy();
  });

  it("works when accepting a recommendation", () => {
    let isRejected: boolean | undefined = undefined;
    const setIsRejected = (value: boolean | undefined) => {
      if (value !== undefined) {
        isRejected = value;
      }
    };
    const mockUpdate = jest.fn();
    const { getByTestId, rerender } = render(
      <ValidationForm
        isRejected={isRejected}
        setIsRejected={(value) => {
          setIsRejected(value);
          rerender(
            <ValidationForm
              isRejected={isRejected}
              setIsRejected={setIsRejected}
              rejectionReason=""
              setRejectionReason={jest.fn()}
              update={mockUpdate}
              setUpdated={jest.fn()}
            />
          );
        }}
        rejectionReason=""
        setRejectionReason={jest.fn()}
        update={mockUpdate}
        setUpdated={jest.fn()}
      />
    );
    const acceptButton = getByTestId("accept-button");
    fireEvent.press(acceptButton);
    expect(acceptButton).toHaveStyle({
      backgroundColor: Colors.green,
    });
    expect(isRejected).toBe(false);
    const validationButton = getByTestId("validation-button");
    fireEvent.press(validationButton);
    expect(mockUpdate).toHaveBeenCalled();
  });

  it("works when rejecting a recommendation", () => {
    let isRejected: boolean | undefined = undefined;
    const setIsRejected = (value: boolean | undefined) => {
      if (value !== undefined) {
        isRejected = value;
      }
    };
    let rejectionReason = "";
    const setRejectionReason = (value: string) => {
      rejectionReason = value;
    };
    const mockUpdate = jest.fn();
    const { getByTestId, rerender } = render(
      <ValidationForm
        isRejected={isRejected}
        setIsRejected={(value) => {
          setIsRejected(value);
          rerender(
            <ValidationForm
              isRejected={isRejected}
              setIsRejected={setIsRejected}
              rejectionReason={rejectionReason}
              setRejectionReason={setRejectionReason}
              update={mockUpdate}
              setUpdated={jest.fn()}
            />
          );
        }}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        update={mockUpdate}
        setUpdated={jest.fn()}
      />
    );
    const rejectButton = getByTestId("reject-button");
    fireEvent.press(rejectButton);
    expect(rejectButton).toHaveStyle({
      backgroundColor: Colors.red,
    });
    expect(isRejected).toBe(true);
    const reasonInput = getByTestId("rejection-reason-input");
    fireEvent.changeText(reasonInput, "Not interested");
    expect(rejectionReason).toBe("Not interested");
    const validationButton = getByTestId("validation-button");
    fireEvent.press(validationButton);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
