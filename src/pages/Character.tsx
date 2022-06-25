import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Status } from '../components/CharacterCard';
import { Loader } from '../components/Loader';
import { useCharacterQuery } from '../graphql/graphql';

const CharacterContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  padding: 10px 15px;
  background-color: transparent;
  border: 1px solid #88be43;
  border-radius: 5px;
  color: #88be43;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
`;

const CharacterData = styled.div`
  color: #fff;
  display: flex;
  gap: 50px;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;

const CharacterImage = styled.img`
  width: 350px;
  @media (max-width: 1140px) {
    width: 300px;
  }

  @media (max-width: 820px) {
    width: 350px;
  }
`;

const MainData = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.h2`
  font-size: 2.3rem;

  @media (max-width: 1140px) {
    font-size: 1.8rem;
  }
`;

const Species = styled.p`
  font-size: 1.5rem;
  color: #999;

  & > span {
    margin-left: 5px;
  }

  @media (max-width: 1140px) {
    font-size: 1.1rem;
  }
`;

const Field = styled.p`
  color: #999;
  font-size: 1.2rem;

  & > span {
    margin-left: 20px;
    text-transform: uppercase;
    color: #fff;
  }

  @media (max-width: 1140px) {
    font-size: 1rem;
  }
`;

const Episodes = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: baseline;
  gap: 20px;
`;

const EpisodesList = styled.ul`
  padding: 0;
  color: #fff;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const Character: FC = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();

  const { data, loading } = useCharacterQuery({
    variables: {
      id: characterId || '',
    },
  });

  const character = data?.character;

  const handleBack = () => {
    navigate(-1);
  };

  return loading ? (
    <Loader />
  ) : character ? (
    <CharacterContainer>
      <BackButton onClick={handleBack}>Back</BackButton>
      <CharacterData>
        <CharacterImage src={character.image || ''} alt="Character avatar" />
        <MainData>
          <div>
            <Name>{character.name}</Name>
            <Species>
              {character.species}{' '}
              <Status
                color={
                  character.status === 'Alive'
                    ? '#93be61'
                    : character.status === 'Dead'
                    ? '#dd7f6e'
                    : '#b8b803'
                }
              >
                {character.status}
              </Status>
            </Species>
          </div>
          <SubData>
            <Field>
              Gender: <span>{character.gender}</span>
            </Field>
            <Field>
              Born place:
              <span>
                {character.origin?.type} - {character.origin?.name}
              </span>
            </Field>
            <Field>
              Last location:{' '}
              <span>
                {character.location?.type} - {character.location?.name}
              </span>
            </Field>
          </SubData>
        </MainData>
      </CharacterData>
      <Episodes>
        <Field>Episodes:</Field>
        <EpisodesList>
          {character.episode.map((episode) => (
            <li key={episode?.episode}>{episode?.name}</li>
          ))}
        </EpisodesList>
      </Episodes>
    </CharacterContainer>
  ) : (
    <h2>Character not founded</h2>
  );
};
