import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';
import { Location } from '../graphql/graphql';

interface ILocationCardProps {
  location: Location;
}

export const LocationCard: FC<ILocationCardProps> = ({ location }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {location.type}
        </Typography>
        <Typography variant="h5">{location.name}</Typography>
      </CardContent>
    </Card>
  );
};
