import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CharacterCard } from '../components/CharacterCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Character, useLocationQuery } from '../graphql/graphql';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 20px;
`;

export const Paper = styled.div`
  border-radius: 10px;
  background-color: rgb(60, 62, 68);
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
    rgb(0 0 0 / 6%) 0px 2px 4px -1px;
`;

const LocationData = styled(Paper)`
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MainData = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubData = styled(MainData)`
  gap: 10px;
`;

const Name = styled.h2`
  font-size: 2.5rem;

  @media (max-width: 1140px) {
    font-size: 2rem;
  }
`;

const ResidentsList = styled.div`
  padding: 10px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 670px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h3`
  padding-left: 10px;
  font-size: 2rem;
  color: white;
`;

const Field = styled.p`
  color: #999;
  font-size: 1.2rem;

  & > span {
    margin-left: 20px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  }

  @media (max-width: 1140px) {
    font-size: 1rem;
  }
`;

export const Location: FC = () => {
  const { locationId } = useParams();

  const { data, loading } = useLocationQuery({
    variables: {
      id: locationId || '',
    },
  });

  const location = data?.location;

  return loading ? (
    <Loader />
  ) : location ? (
    <Container>
      <Content>
        <LocationData>
          <MainData>
            <Name>{location.name}</Name>
            <Field>{location.type}</Field>
          </MainData>
          <SubData>
            <Field>
              Dimension: <span>{location.dimension}</span>
            </Field>
          </SubData>
        </LocationData>
        <Title>Residents</Title>
        <ResidentsList>
          {location.residents.map((resident) => (
            <CharacterCard
              key={resident?.id}
              character={resident as Character}
            />
          ))}
        </ResidentsList>
      </Content>
    </Container>
  ) : (
    <h2>Character not founded</h2>
  );
};
