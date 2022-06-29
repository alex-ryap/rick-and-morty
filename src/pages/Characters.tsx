import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CharacterCard } from '../components/CharacterCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Character, useCharactersQuery } from '../graphql/graphql';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Characters: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  const { data, loading, fetchMore } = useCharactersQuery({
    variables: {
      page: 1,
    },
  });

  const nextPage = useCallback(() => {
    setIsActive(false);
    setPage(page + 1);
  }, [page]);

  const infiniteScrollRef = useInfiniteScroll(nextPage, isActive);

  useEffect(() => {
    if (data?.characters?.results) {
      const newCharacters = (data.characters.results as Character[]) ?? [];
      setCharacters([...newCharacters]);
    }
  }, [data?.characters?.results]);

  useEffect(() => {
    const maxPage = data?.characters?.info?.pages ?? 1;

    if (page === 1 || page > maxPage) return;

    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newCharacters = (data.characters?.results as Character[]) ?? [];
      setCharacters((prev) => [...prev, ...newCharacters]);
      setIsActive(true);
    });

    // eslint-disable-next-line
  }, [page]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <GridContainer>
        {characters?.map((character, idx) => (
          <CharacterCard
            key={character?.id}
            character={character as Character}
            ref={idx === characters.length - 1 ? infiniteScrollRef : null}
          />
        ))}
      </GridContainer>
    </Container>
  );
};
