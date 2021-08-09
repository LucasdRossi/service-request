import { render, screen } from "@testing-library/react";

import StartEndAddress, { StartEndAddressProps } from ".";

describe("StartEndAddress Component", () => {
  it("should render the starting and ending address", () => {
    const fakeAddressProps: StartEndAddressProps = {
      end: "2894 Elfrieda Courts",
      start: "3632 Eugenia Lodge",
    };

    render(<StartEndAddress {...fakeAddressProps} />);

    const endAddress = screen.queryByText(fakeAddressProps.end);
    const startAddress = screen.queryByText(fakeAddressProps.start);

    expect(endAddress).toBeInTheDocument();
    expect(startAddress).toBeInTheDocument();
  });
});
