import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StatusFailed, StatusSuccess } from '../components/CharacterCard';
import { Loader } from '../components/Loader';
import { useCharacterQuery } from '../graphql/graphql';

const GridContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;

  @media (max-width: 888px) {
    & > img {
      justify-self: center;
    }
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
  }
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FieldValue = styled.span`
  color: black;
`;

const Episodes = styled.div`
  display: flex;
  gap: 10px;
`;

const EpisodesList = styled.div`
  display: flex;
  flex-direction: column;
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
    <>
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{ color: '#88be43', borderColor: '#88be43', mb: 2 }}
      >
        Back
      </Button>
      <GridContainer>
        <img src={character?.image || ''} alt="Character avatar" />
        <CharacterInfo>
          <Typography
            variant="h3"
            component="div"
            sx={{ display: 'flex', gap: 2, mb: 2 }}
          >
            {character?.name}
            {character.status === 'Alive' ? (
              <StatusSuccess style={{ fontSize: 14, alignSelf: 'flex-start' }}>
                {character.status}
              </StatusSuccess>
            ) : (
              <StatusFailed style={{ fontSize: 14, alignSelf: 'flex-start' }}>
                {character.status}
              </StatusFailed>
            )}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Species: <FieldValue>{character?.species}</FieldValue>
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Gender: <FieldValue>{character?.gender}</FieldValue>
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Home: <FieldValue>{character?.origin?.name}</FieldValue>
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Current location:{' '}
            <FieldValue>{character?.location?.name}</FieldValue>
          </Typography>
          <Episodes>
            <Typography variant="h5" color="text.secondary">
              Episodes:
            </Typography>
            <EpisodesList>
              {character?.episode.map((episode) => (
                <Typography
                  key={episode?.episode}
                  variant="h5"
                >{`${episode?.episode} - ${episode?.name}`}</Typography>
              ))}
            </EpisodesList>
          </Episodes>
        </CharacterInfo>
      </GridContainer>
    </>
  ) : (
    <Typography variant="h5">Character not founded</Typography>
  );
};
