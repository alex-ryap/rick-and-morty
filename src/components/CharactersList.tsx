import { FC } from 'react';
import styled from 'styled-components';
import { Character } from '../graphql/graphql';
import { CharacterCard } from './CharacterCard';

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 350px);
  gap: 20px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media (max-width: 788px) {
    grid-template-columns: minmax(350px, 1fr);
  }
`;

interface ICharactersListProps {
  characters: Character[];
}

export const CharactersList: FC<ICharactersListProps> = ({ characters }) => {
  return (
    <GridContainer>
      {characters?.map((character) => (
        <CharacterCard key={character?.id} character={character as Character} />
      ))}
    </GridContainer>
  );
};
