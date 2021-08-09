import { useContext, useState, useEffect } from "react";

import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

import MapContext from "../../contexts/map";

interface MapProps {}

const Map: React.FC<MapProps> = (props) => {
  const [directionsServiceResponse, setDirectionsServiceResponse] =
    useState<any>();
  const [shouldFetchNewPath, setShouldFetchNewPath] = useState(false);

  const {
    currentPosition,
    driverPosition,
    currentAction,
    changeDriverPosition,
    changeAction,
    changeServiceInfo,
    serviceInfo,
  } = useContext(MapContext);

  useEffect(() => {
    if (currentAction === "firstFetch") {
      setShouldFetchNewPath(true);
    } else if (currentAction === "selecting") {
      setShouldFetchNewPath(false);
      setDirectionsServiceResponse(null);
    }
  }, [currentAction]);

  const directionsServiceCallback = (response: any) => {
    if (response && currentAction !== "selecting" && currentAction !== "done") {
      setShouldFetchNewPath(false);
      changeAction("driving");
      setDirectionsServiceResponse(response);
      const {
        distance,
        duration,
        start_address: startAddress,
        end_address: endAddress,
      } = response.routes[0].legs[0];

      changeServiceInfo({
        distance: distance.text,
        duration: duration.text,
        startAddress: serviceInfo?.startAddress
          ? serviceInfo?.startAddress
          : startAddress.substring(0, startAddress.indexOf("-")),
        endAddress: serviceInfo?.endAddress
          ? serviceInfo?.endAddress
          : endAddress.substring(0, endAddress.indexOf("-")),
      });

      if (response.routes[0].overview_path.length > 1) {
        const nextPoint = response.routes[0].overview_path[1];
        setTimeout(() => {
          const { lat, lng } = nextPoint;

          changeDriverPosition({ lat: lat(), lng: lng() });
          setShouldFetchNewPath(true);
        }, 2000);
      } else {
        changeAction("done");
      }
    }
  };

  return (
    <>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={{
            width: "60%",
            height: "90%",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
          clickableIcons={false}
          center={
            driverPosition
              ? undefined
              : {
                  lat: currentPosition.lat,
                  lng: currentPosition.lng,
                }
          }
          zoom={17}
          onLoad={(map) => {
            map.setOptions({
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
              rotateControl: false,
            });
          }}
        >
          <Marker
            position={{
              lat: currentPosition.lat,
              lng: currentPosition.lng,
            }}
          />
          {driverPosition &&
            currentAction === "driving" &&
            directionsServiceResponse && (
              <div style={{ borderRadius: "50%" }}>
                <Marker
                  position={{
                    lat: directionsServiceResponse.routes[0].overview_path[0].lat(),
                    lng: directionsServiceResponse.routes[0].overview_path[0].lng(),
                  }}
                  icon={{
                    url: serviceInfo?.driver.picture,
                    scaledSize: {
                      width: 45,
                      height: 45,
                    },
                  }} // TODO: colocar um ícone
                />
              </div>
            )}
          {currentAction === "driving" && directionsServiceResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsServiceResponse,
                suppressMarkers: true,
              }}
            />
          )}
          {shouldFetchNewPath && (
            <DirectionsService
              options={{
                destination: currentPosition,
                origin: driverPosition,
                travelMode: "DRIVING",
              }}
              callback={directionsServiceCallback}
            />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
