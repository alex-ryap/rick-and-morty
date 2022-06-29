import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EpisodeCard } from '../components/EpisodeCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Episode, useEpisodesQuery } from '../graphql/graphql';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Episodes: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  const { data, loading, fetchMore } = useEpisodesQuery({
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
    if (data?.episodes?.results) {
      const newEpisodes = (data.episodes.results as Episode[]) ?? [];
      setEpisodes([...newEpisodes]);
    }
  }, [data?.episodes?.results]);

  useEffect(() => {
    const maxPage = data?.episodes?.info?.pages ?? 1;

    if (page === 1 || page > maxPage) return;

    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newEpisodes = (data.episodes?.results as Episode[]) ?? [];
      setEpisodes((prev) => [...prev, ...newEpisodes]);
      setIsActive(true);
    });

    // eslint-disable-next-line
  }, [page]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <GridContainer>
        {episodes?.map((episode, idx) => {
          if (idx + 1 === episodes.length) {
            return (
              <EpisodeCard
                key={episode?.id}
                episode={episode as Episode}
                ref={infiniteScrollRef}
              />
            );
          } else {
            return (
              <EpisodeCard key={episode?.id} episode={episode as Episode} />
            );
          }
        })}
      </GridContainer>
    </Container>
  );
};
