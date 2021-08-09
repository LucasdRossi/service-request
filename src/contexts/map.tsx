import { createContext, useState, useEffect } from "react";

import { LoadScript } from "@react-google-maps/api";

import { fakeUser } from "../services/fakeUser";

export interface MapContextData {
  changeCurrentPosition: (newPosition: Coordinates) => void;
  changeDriverPosition: (newPosition: Coordinates) => void;
  changeAction: (newAction: Action) => void;
  changeServiceInfo: (newInfo: Omit<ServiceInfo, "driver">) => void;
  requestService: () => void;
  cancelService: () => void;
  finishService: () => void;

  currentAction: Action;
  currentPosition?: Coordinates;
  driverPosition?: Coordinates;
  serviceInfo?: ServiceInfo;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Driver {
  name: string;
  picture: string;
  rating: number;
}

interface ServiceInfo {
  distance: string;
  duration: string;
  startAddress: string;
  endAddress: string;
  driver: Driver;
}

type Action = "selecting" | "firstFetch" | "driving" | "done";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

const libraries: Libraries = ["places"];

const MapContext = createContext<MapContextData>({} as MapContextData);

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) throw new Error("Expecting google maps api key");

export const MapProvider: React.FC = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates>();
  const [driverPosition, setDriverPosition] = useState<Coordinates>();

  const [serviceInfo, setServiceInfo] = useState<ServiceInfo>();

  const [currentAction, setCurrentAction] = useState<Action>("selecting");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const changeCurrentPosition = (newPosition: Coordinates) => {
    setCurrentPosition(newPosition);
  };

  const changeDriverPosition = (newPosition: Coordinates) => {
    setDriverPosition(newPosition);
  };

  const changeAction = (newAction: Action) => {
    setCurrentAction(newAction);
  };

  const cancelService = () => {
    changeAction("selecting");
    setDriverPosition(undefined);
    setServiceInfo(undefined);
  };

  const finishService = () => {
    cancelService();
  };

  const requestService = () => {
    if (currentPosition) {
      const offset = Math.random() * (0.006 - -0.006);

      const newLat = Math.floor(Math.random() * (2 - 0))
        ? currentPosition.lat + offset
        : currentPosition.lat - offset;
      const newLng = Math.floor(Math.random() * (2 - 0))
        ? currentPosition.lng + offset
        : currentPosition.lng - offset;

      setDriverPosition({
        lat: newLat,
        lng: newLng,
      });
      changeAction("firstFetch");
    }
  };

  const changeServiceInfo = async (newInfo: Omit<ServiceInfo, "driver">) => {
    if (!serviceInfo) {
      const response = await fakeUser.get("/");

      const { name, picture } = response.data.results[0];

      setServiceInfo({
        ...newInfo,
        driver: {
          name: `${name.first} ${name.last}`,
          picture: picture.large,
          rating: Math.floor(Math.random() * (50 - 40) + 40) / 10,
        },
      });
    } else {
      setServiceInfo({
        ...newInfo,
        driver: serviceInfo.driver,
      });
    }
  };

  return (
    <MapContext.Provider
      value={{
        changeCurrentPosition,
        changeDriverPosition,
        changeAction,
        changeServiceInfo,
        currentAction,
        driverPosition,
        currentPosition,
        requestService,
        finishService,
        cancelService,
        serviceInfo,
      }}
    >
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
        {children}
      </LoadScript>
    </MapContext.Provider>
  );
};

export default MapContext;
