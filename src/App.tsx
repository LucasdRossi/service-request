import GlobalStyle from "./styles/GlobalStyles";

import MainCard from "./components/MainCard";
import Map from "./components/Map";

import { MapProvider } from "./contexts/map";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <MapProvider>
          <MainCard />
          <Map />
        </MapProvider>
      </div>
    </>
  );
};

export default App;
