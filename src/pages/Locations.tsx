import { createRef, FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { LocationCard } from '../components/LocationCard';
import { useLocationsQuery, Location } from '../graphql/graphql';

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

export const Locations: FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [lastLoadedPageNum, setLastLoadedPageNum] = useState<number>(0);

  const [pageNum, setPageNum] = useState<number>(1);
  const lastItem = createRef<HTMLDivElement>();
  const observerLoader = useRef<IntersectionObserver>();

  const { data, loading, fetchMore } = useLocationsQuery({
    variables: {
      page: 1,
    },
  });

  useEffect(() => {
    if (data?.locations?.results) {
      const newLocations = (data.locations.results as Location[]) ?? [];
      setLocations([...newLocations]);
    }
  }, [data?.locations?.results]);

  const loadData = useCallback((page: number) => {
    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newLocations = (data.locations?.results as Location[]) ?? [];
      setLastLoadedPageNum(page);
      setPageNum(page);
      setLocations((prev) => [...prev, ...newLocations]);
    });
    // eslint-disable-next-line
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        const nextPage = pageNum + 1;
        const pagesCount = data?.locations?.info?.pages || 1;
        if (nextPage !== lastLoadedPageNum && nextPage <= pagesCount) {
          loadData(nextPage);
        }
      }
    },
    [pageNum, lastLoadedPageNum, loadData, data?.locations?.info?.pages]
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
        {locations?.map((location, idx) => {
          if (idx + 1 === locations.length) {
            return (
              <LocationCard
                key={location?.id}
                location={location as Location}
                ref={lastItem}
              />
            );
          } else {
            return (
              <LocationCard
                key={location?.id}
                location={location as Location}
              />
            );
          }
        })}
      </GridContainer>
    </Container>
  );
};
