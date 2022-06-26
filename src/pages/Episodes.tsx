import { createRef, FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EpisodeCard } from '../components/EpisodeCard';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { Episode, useEpisodesQuery } from '../graphql/graphql';

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
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [lastLoadedPageNum, setLastLoadedPageNum] = useState<number>(0);

  const [pageNum, setPageNum] = useState<number>(1);
  const lastItem = createRef<HTMLDivElement>();
  const observerLoader = useRef<IntersectionObserver>();

  const { data, loading, fetchMore } = useEpisodesQuery({
    variables: {
      page: 1,
    },
  });

  useEffect(() => {
    if (data?.episodes?.results) {
      const newEpisodes = (data.episodes.results as Episode[]) ?? [];
      setEpisodes([...newEpisodes]);
    }
  }, [data?.episodes?.results]);

  const loadData = useCallback((page: number) => {
    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newEpisodes = (data.episodes?.results as Episode[]) ?? [];
      setLastLoadedPageNum(page);
      setPageNum(page);
      setEpisodes((prev) => [...prev, ...newEpisodes]);
    });
    // eslint-disable-next-line
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        const nextPage = pageNum + 1;
        const pagesCount = data?.episodes?.info?.pages || 1;
        if (nextPage !== lastLoadedPageNum && nextPage <= pagesCount) {
          loadData(nextPage);
        }
      }
    },
    [pageNum, lastLoadedPageNum, loadData, data?.episodes?.info?.pages]
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
        {episodes?.map((episode, idx) => {
          if (idx + 1 === episodes.length) {
            return (
              <EpisodeCard
                key={episode?.id}
                episode={episode as Episode}
                ref={lastItem}
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
