import { forwardRef, memo, useCallback } from 'react';
import { Character } from '../graphql/graphql';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CHARACTERS_PAGE } from '../utils/constants';

const Card = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgb(60, 62, 68);
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
    rgb(0 0 0 / 6%) 0px 2px 4px -1px;
  transition: 0.2s all;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  &:hover h3 {
    color: #bff77e;
  }

  @media (max-width: 880px) {
    flex-direction: column;
    font-size: 18px;
  }
`;

const CardMedia = styled.img`
  width: 150px;
  @media (max-width: 880px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  padding: 10px 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`;

const Title = styled.h3`
  text-decoration: none;
  font-size: 1.4rem;
  color: white;
  transition: 0.2s all;

  @media (max-width: 880px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #999;
  font-size: 1rem;
  @media (max-width: 880px) {
    font-size: 1.5rem;
  }
`;

interface IStatus {
  color: string;
}

export const Status = styled.span<IStatus>`
  padding: 0 5px;
  color: white;
  border-radius: 7px;
  width: fit-content;
  background-color: ${(p) => p.color};
`;

interface ICharacterCardProps {
  character: Character;
}

const CharacterComponent = forwardRef<HTMLDivElement, ICharacterCardProps>(
  ({ character }, ref) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      const link = `${CHARACTERS_PAGE}/${character.id}`;
      navigate(link);
    }, [navigate, character.id]);

    return (
      <Card onClick={handleClick} ref={ref}>
        <CardMedia src={character.image ?? ''} alt="Character avatar" />
        <CardContent>
          <Title>{character.name}</Title>
          <Subtitle>{character.species}</Subtitle>
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
        </CardContent>
      </Card>
    );
  }
);

export const CharacterCard = memo(CharacterComponent);
