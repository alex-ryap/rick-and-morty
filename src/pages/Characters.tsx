import { createRef, FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CharacterCard } from '../components/CharacterCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Character, useAllCharactersQuery } from '../graphql/graphql';

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [lastLoadedPageNum, setLastLoadedPageNum] = useState<number>(0);

  const [pageNum, setPageNum] = useState<number>(1);
  const lastItem = createRef<HTMLDivElement>();
  const observerLoader = useRef<IntersectionObserver>();

  const { data, loading, fetchMore } = useAllCharactersQuery({
    variables: {
      page: 1,
    },
  });

  useEffect(() => {
    if (data?.characters?.results) {
      const newCharacters = (data.characters.results as Character[]) ?? [];
      setCharacters([...newCharacters]);
    }
  }, [data?.characters?.results]);

  const loadData = useCallback((page: number) => {
    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newCharacters = (data.characters?.results as Character[]) ?? [];
      setLastLoadedPageNum(page);
      setPageNum(page);
      setCharacters((prev) => [...prev, ...newCharacters]);
    });
    // eslint-disable-next-line
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        const nextPage = pageNum + 1;
        const pagesCount = data?.characters?.info?.pages || 1;
        if (nextPage !== lastLoadedPageNum && nextPage <= pagesCount) {
          loadData(nextPage);
        }
      }
    },
    [pageNum, lastLoadedPageNum, loadData, data?.characters?.info?.pages]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0,
    };

    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(handleObserver, options);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
    // eslint-disable-next-line
  }, [lastItem]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <GridContainer>
        {characters?.map((character, idx) => {
          if (idx + 1 === characters.length) {
            return (
              <CharacterCard
                key={character?.id}
                character={character as Character}
                ref={lastItem}
              />
            );
          } else {
            return (
              <CharacterCard
                key={character?.id}
                character={character as Character}
              />
            );
          }
        })}
      </GridContainer>
    </Container>
  );
};
