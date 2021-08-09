import { render, screen } from "@testing-library/react";

import MapContext, { MapContextData } from "../../contexts/map";

import MainCard from ".";

import userEvent from "@testing-library/user-event";

const fakeContextData: MapContextData = {
  cancelService: jest.fn(),
  changeAction: jest.fn(),
  changeCurrentPosition: jest.fn(),
  changeDriverPosition: jest.fn(),
  changeServiceInfo: jest.fn(),
  finishService: jest.fn(),
  requestService: jest.fn(),

  currentAction: "selecting",
  serviceInfo: {
    distance: "1 m",
    duration: "1 min",
    endAddress: "39551 Hudson Motorway",
    startAddress: "426 George Ways",
    driver: {
      name: "Reanna Wehner",
      picture: "http://placeimg.com/640/480",
    },
  },
};

describe("MainCard Component", () => {
  it("should render address input and request service button with 'selecting' as currentAction", () => {
    render(
      <MapContext.Provider value={fakeContextData}>
        <MainCard />
      </MapContext.Provider>
    );

    const addressInput = screen.getByRole("textbox");
    const requestServiceButton = screen.getByRole("button");

    expect(addressInput).toBeInTheDocument();
    expect(requestServiceButton).toBeInTheDocument();

    userEvent.type(addressInput, "982 Gilda Plain");
    userEvent.click(requestServiceButton);
    expect(fakeContextData.requestService).toHaveBeenCalledTimes(1);
  });

  it("should render cancel service button with 'driving' as currentAction", () => {
    fakeContextData.currentAction = "driving";
    render(
      <MapContext.Provider value={fakeContextData}>
        <MainCard />
      </MapContext.Provider>
    );

    const cancelServiceButton = screen.getByRole("button");
    expect(cancelServiceButton).toBeInTheDocument();

    userEvent.click(cancelServiceButton);
    expect(fakeContextData.cancelService).toHaveBeenCalledTimes(1);
  });

  it("should render finish button with 'done' as currentAction", () => {
    fakeContextData.currentAction = "done";
    render(
      <MapContext.Provider value={fakeContextData}>
        <MainCard />
      </MapContext.Provider>
    );

    const finishServiceButton = screen.getByRole("button");
    expect(finishServiceButton).toBeInTheDocument();

    userEvent.click(finishServiceButton);
    expect(fakeContextData.finishService).toHaveBeenCalledTimes(1);
  });
});
