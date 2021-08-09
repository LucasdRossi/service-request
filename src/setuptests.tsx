import React from "react";
import "@testing-library/jest-dom";

jest.mock("@react-google-maps/api", () => {
  return {
    Autocomplete: (props: { children: React.ReactNode }) => (
      <div>{props.children}</div>
    ),
    GoogleMap: (props: { children: React.ReactNode }) => (
      <div>
        <div className="mock-google-maps" />
        {props.children}
      </div>
    ),
  };
});

(global as any).google = {
  maps: {
    LatLngBounds: () => ({
      extend: () => {},
    }),
    MapTypeId: {
      ROADMAP: "rdmap",
      SATELLITE: "stllte",
    },
    ControlPosition: {
      BOTTOM_CENTER: "BC",
      BOTTOM_LEFT: "BL",
      BOTTOM_RIGHT: "BR",
      LEFT_BOTTOM: "LB",
      LEFT_CENTER: "LC",
      LEFT_TOP: "LT",
      RIGHT_BOTTOM: "RB",
      RIGHT_CENTER: "RC",
      RIGHT_TOP: "RT",
      TOP_CENTER: "TC",
      TOP_LEFT: "TL",
      TOP_RIGHT: "TR",
    },
    Size: function (w: any, h: any) {},
    Data: class {
      setStyle() {}
      addListener() {}
      setMap() {}
    },
  },
};
