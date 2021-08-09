import { Container, Icon, Info, InfoContainer } from "./styles";

import startingPoint from "../../assets/startingPoint.svg";
import endingPoint from "../../assets/endingPoint.svg";

export interface StartEndAddressProps {
  start: string;
  end: string;
}

const StartEndAddress: React.FC<StartEndAddressProps> = (props) => {
  const { start, end } = props;

  return (
    <Container>
      <InfoContainer>
        <Icon src={startingPoint} alt="starting point" width={30} />
        <Info>{start}</Info>
      </InfoContainer>
      <InfoContainer style={{ marginTop: 20 }}>
        <Icon src={endingPoint} alt="ending point" width={30} />
        <Info>{end}</Info>
      </InfoContainer>
    </Container>
  );
};

export default StartEndAddress;
