import { FC } from 'react';
import styled from 'styled-components';
import { Location } from '../graphql/graphql';
import { LocationCard } from './LocationCard';

interface ILocationsListProps {
  locations: Location[];
}

const LocationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 1140px) {
    grid-template-columns: repeat(2, minmax(350px, 1fr));
  }
  @media (max-width: 788px) {
    grid-template-columns: minmax(350px, 1fr);
  }
`;

export const LocationsList: FC<ILocationsListProps> = ({ locations }) => {
  return (
    <LocationsWrapper>
      {locations.map((locationItem) => (
        <LocationCard
          key={locationItem.id}
          location={locationItem as Location}
        />
      ))}
    </LocationsWrapper>
  );
};
