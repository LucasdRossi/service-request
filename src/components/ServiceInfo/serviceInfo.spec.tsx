import { render, screen } from "@testing-library/react";

import ServiceInfo, { ServiceInfoProps } from ".";

describe("ServiceInfo Component", () => {
  it("should render the service distance, time and value", () => {
    const fakeServiceprops: ServiceInfoProps = {
      distance: "1 m",
      time: "1 min",
      value: "R$ 25.00",
    };

    render(<ServiceInfo {...fakeServiceprops} />);

    const serviceDistance = screen.queryByText(fakeServiceprops.distance);
    const serviceTime = screen.queryByText(fakeServiceprops.time);
    const serviceValue = screen.queryByText(fakeServiceprops.value);

    expect(serviceDistance).toBeInTheDocument();
    expect(serviceTime).toBeInTheDocument();
    expect(serviceValue).toBeInTheDocument();
  });
});
