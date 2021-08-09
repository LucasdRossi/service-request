import { useState, useContext } from "react";

import {
  Title,
  Label,
  Input,
  Button,
  DangerButton,
  SubTitle,
  Link,
  LinkContainer,
  Container,
} from "./styles";

import greenPoint from "../../assets/greenPoint.svg";

import { Autocomplete } from "@react-google-maps/api";

import DriverInfo from "../DriverInfo";
import ServiceInfo from "../ServiceInfo";
import StartEndAddress from "../StartEndAddress";

import MapContext from "../../contexts/map";

interface MainCardProps {}

const MainCard: React.FC<MainCardProps> = (props) => {
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState<any>();

  const {
    changeCurrentPosition,
    requestService,
    currentAction,
    serviceInfo,
    cancelService,
    finishService,
  } = useContext(MapContext);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePlaceChange = () => {
    const {
      geometry: { location },
      name,
    } = autocomplete.getPlace();

    setAddress(name);

    changeCurrentPosition({ lat: location.lat(), lng: location.lng() });
  };

  return (
    <Container tall={currentAction === "driving"}>
      {currentAction === "selecting" && (
        <>
          <Title>Solicite um atendimento</Title>
          <div>
            <Label>Informe o local do atendimento</Label>
            <Autocomplete
              onPlaceChanged={handlePlaceChange}
              onLoad={(a) => setAutocomplete(a)}
            >
              <Input
                onChange={handleAddressChange}
                value={address}
                placeholder="Av. Brasil, 123"
              />
            </Autocomplete>
          </div>
          {address.length === 0 && (
            <LinkContainer>
              <img src={greenPoint} alt="green point" width={20} />
              <Link onClick={requestService}>
                Utilizar minha localização atual
              </Link>
            </LinkContainer>
          )}
          <Button disabled={address.length === 0} onClick={requestService}>
            Solicitar
          </Button>
        </>
      )}
      {currentAction === "driving" && serviceInfo && (
        <>
          <Title>Atendimento a caminho</Title>
          <DriverInfo
            name={serviceInfo.driver.name}
            rating={serviceInfo.driver.rating}
            pictureUrl={serviceInfo.driver.picture}
          />
          <StartEndAddress
            start={serviceInfo.startAddress}
            end={serviceInfo.endAddress}
          />
          <ServiceInfo
            value="R$ 25,00"
            distance={serviceInfo.distance}
            time={serviceInfo.duration}
          />
          <DangerButton onClick={cancelService}>Cancelar</DangerButton>
        </>
      )}
      {currentAction === "done" && serviceInfo && (
        <>
          <Title>Atendimento em andamento</Title>
          <SubTitle>Seu atendimento chegou!</SubTitle>
          <SubTitle>Clique em finalizar para encerrar o chamado.</SubTitle>
          <Button onClick={finishService}>Finalizar</Button>
        </>
      )}
    </Container>
  );
};

export default MainCard;
