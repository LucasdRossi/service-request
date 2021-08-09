import {
  Container,
  Name,
  Rating,
  Picture,
  InfoContainer,
  RatingContainer,
} from "./styles";

import star from "../../assets/star.svg";

export interface DriverInfoProps {
  name: string;
  rating: number;
  pictureUrl: string;
}

const DriverInfo: React.FC<DriverInfoProps> = (props) => {
  const { name, rating, pictureUrl } = props;

  return (
    <Container>
      <Picture src={pictureUrl} alt="driver" width={90} />
      <InfoContainer>
        <Name>{name}</Name>
        <RatingContainer>
          <img src={star} alt="start" />
          <Rating>{rating}</Rating>
        </RatingContainer>
      </InfoContainer>
    </Container>
  );
};

export default DriverInfo;
