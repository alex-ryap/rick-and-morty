import { FC } from 'react';
import { Character } from '../graphql/graphql';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CHARACTERS_PAGE } from '../utils/constants';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const TitleLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: #88be43;
  }
`;

const Status = styled.span`
  padding: 5px 10px;
  color: white;
  border-radius: 7px;
  width: fit-content;
`;

export const StatusSuccess = styled(Status)`
  background-color: #88be43;
`;
export const StatusFailed = styled(Status)`
  background-color: tomato;
`;

interface ICharacterCardProps {
  character: Character;
}

export const CharacterCard: FC<ICharacterCardProps> = ({ character }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={character.image || ''}
        alt="Character image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1,
          }}
        >
          <TitleLink to={`${CHARACTERS_PAGE}/${character.id}`}>
            <Typography variant="h5">{character.name}</Typography>
          </TitleLink>
          {character.status === 'Alive' ? (
            <StatusSuccess>{character.status}</StatusSuccess>
          ) : (
            <StatusFailed>{character.status}</StatusFailed>
          )}
          <Typography variant="subtitle1" color="text.secondary">
            {character.species}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
