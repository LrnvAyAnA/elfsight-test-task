import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

const STATUS_COLORS = {
  Alive: '#83bf46',
  Dead: '#ff5152',
  unknown: '#968c9d'
};

const GENDER_ICONS = {
  Male: <Male width={20} height={20} fill="#33b3c8" title="Male" />,
  Female: <Female width={24} height={24} fill="pink" title="Female" />,
  Genderless: (
    <Genderless width={24} height={24} fill="#999" title="Genderless" />
  ),
  unknown: <Genderless width={24} height={24} fill="#999" title="Genderless" />
};

export const CardTitle = ({ name, gender, className }) => (
  <TitleContainer className={className}>
    <Title>{name}</Title>
    <IconWrapper>{GENDER_ICONS[gender] || GENDER_ICONS.unknown}</IconWrapper>
  </TitleContainer>
);

export const CardStatus = ({ status, species, type, className }) => (
  <StatusContainer className={className}>
    <StatusDot status={status}>{status}</StatusDot>
    &nbsp;-&nbsp;
    <Species>{species}</Species>
    {type && <Type>{type}</Type>}
  </StatusContainer>
);

export const Card = ({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) => (
  <CardWrapper onClick={onClickHandler}>
    <Image src={image} alt={name} />
    <Info>
      <CardTitle name={name} gender={gender} />
      <CardStatus status={status} species={species} type={type} />
    </Info>
  </CardWrapper>
);

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const Image = styled.img`
  border-radius: 10px 10px 0 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #fff;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin-right: 8px;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StatusDot = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status }) =>
      STATUS_COLORS[status] || STATUS_COLORS.unknown};
  }
`;

const Species = styled.span``;

const Type = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;
