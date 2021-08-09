import { render, screen } from "@testing-library/react";

import DriverInfo, { DriverInfoProps } from ".";

describe("DriverInfo Component", () => {
  it("should render the driver name and rating", () => {
    const fakeDriverProps: DriverInfoProps = {
      name: "Joni Baez",
      rating: 3.5,
      pictureUrl: "http://placeimg.com/640/480/sports",
    };

    render(<DriverInfo {...fakeDriverProps} />);

    const driverName = screen.queryByText(fakeDriverProps.name);
    const driverRating = screen.queryByText(fakeDriverProps.rating);
    const driverPicture = screen.getByRole("img");

    expect(driverName).toBeInTheDocument();
    expect(driverRating).toBeInTheDocument();
    expect(driverPicture).toBeInTheDocument();
  });
});
