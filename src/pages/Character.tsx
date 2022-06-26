import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Status } from '../components/CharacterCard';
import { EpisodeCard } from '../components/EpisodeCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Episode, useCharacterQuery } from '../graphql/graphql';
import { LOCATIONS_PAGE } from '../utils/constants';
import { Paper } from './Location';

const Content = styled.div`
  display: flex;
  color: #fff;
  gap: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CharacterData = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    gap: 20px;
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const MainData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 900px) {
    flex-grow: 1;
  }
`;

const SubData = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Field = styled.p`
  color: #999;
  font-size: 1.2rem;
`;

const FieldValue = styled.span`
  margin-left: 20px;
  font-weight: 700;
  color: #fff;
`;

const FieldValueLink = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  font-weight: 700;
  color: #fff;

  &:hover {
    color: #93be61;
  }
`;

const Episodes = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EpisodesList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 2rem;
  color: white;
`;

export const CharacterPage: FC = () => {
  const { characterId } = useParams();

  const { data, loading } = useCharacterQuery({
    variables: {
      id: characterId || '',
    },
  });

  const character = data?.character;

  return loading ? (
    <Loader />
  ) : character ? (
    <Container>
      <Content>
        <CharacterData>
          <img src={character.image || ''} alt="Character avatar" />
          <MainData>
            <Title>{character.name}</Title>
            <Status
              color={
                character.status === 'Alive'
                  ? '#93be61'
                  : character.status === 'Dead'
                  ? '#dd7f6e'
                  : '#b8b803'
              }
            >
              {character.status?.toLowerCase()}
            </Status>
          </MainData>
        </CharacterData>
        <Episodes>
          <Title>About</Title>
          <SubData>
            <Field>
              Gender: <FieldValue>{character.gender}</FieldValue>
            </Field>
            <Field>
              Species: <FieldValue>{character.species}</FieldValue>
            </Field>
            <Field>
              Born place:
              <FieldValueLink to={`${LOCATIONS_PAGE}/${character?.origin?.id}`}>
                {character.origin?.type} - {character.origin?.name}
              </FieldValueLink>
            </Field>
            <Field>
              Last location:{' '}
              <FieldValueLink
                to={`${LOCATIONS_PAGE}/${character?.location?.id}`}
              >
                {character.location?.type} - {character.location?.name}
              </FieldValueLink>
            </Field>
          </SubData>
          <Title>Episodes</Title>
          <EpisodesList>
            {character.episode.map((episode) => (
              <EpisodeCard
                key={episode?.episode}
                episode={episode as Episode}
              />
            ))}
          </EpisodesList>
        </Episodes>
      </Content>
    </Container>
  ) : (
    <h2>Character not founded</h2>
  );
};
