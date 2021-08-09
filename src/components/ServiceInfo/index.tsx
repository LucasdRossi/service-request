import { Container, Title, Info } from "./styles";

export interface ServiceInfoProps {
  distance: string;
  time: string;
  value: string;
}

const ServiceInfo: React.FC<ServiceInfoProps> = (props) => {
  const { distance, time, value } = props;

  return (
    <Container>
      <div>
        <Title>DISTÂNCIA</Title>
        <Info>{distance}</Info>
      </div>
      <div>
        <Title>TEMPO</Title>
        <Info>{time}</Info>
      </div>
      <div>
        <Title>VALOR</Title>
        <Info>{value}</Info>
      </div>
    </Container>
  );
};

export default ServiceInfo;
