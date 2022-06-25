import { FC } from 'react';
import { Location } from '../graphql/graphql';

interface ILocationCardProps {
  location: Location;
}

export const LocationCard: FC<ILocationCardProps> = ({ location }) => {
  return <h1>{location.name}</h1>;
};
