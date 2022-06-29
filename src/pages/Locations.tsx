import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../components/Layout';
import { Loader } from '../components/Loader';
import { LocationCard } from '../components/LocationCard';
import { useLocationsQuery, Location } from '../graphql/graphql';
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

export const Locations: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  const { data, loading, fetchMore } = useLocationsQuery({
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
    if (data?.locations?.results) {
      const newLocations = (data.locations.results as Location[]) ?? [];
      setLocations([...newLocations]);
    }
  }, [data?.locations?.results]);

  useEffect(() => {
    const maxPage = data?.locations?.info?.pages ?? 1;

    if (page === 1 || page > maxPage) return;

    fetchMore({
      variables: {
        page,
      },
    }).then(({ data }) => {
      const newLocations = (data.locations?.results as Location[]) ?? [];
      setLocations((prev) => [...prev, ...newLocations]);
      setIsActive(true);
    });

    // eslint-disable-next-line
  }, [page]);

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
                ref={infiniteScrollRef}
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
