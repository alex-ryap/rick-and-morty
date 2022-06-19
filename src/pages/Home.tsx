import { FC } from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import inscription from '../img/inscription.png';

export const Title = styled(Typography)`
  color: #88be43;
`;

const Inscription = styled.img`
  width: 60%;
`;

export const Home: FC = () => {
  return (
    <Grid
      container
      rowSpacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: 'calc(100vh - 132px)' }}
    >
      <Grid item>
        <Title variant="h3">Welcome to</Title>
      </Grid>
      <Grid item container justifyContent="center">
        <Inscription src={inscription} alt="Inscription" />
      </Grid>
      <Grid item>
        <Title variant="h3">Wiki</Title>
      </Grid>
    </Grid>
  );
};
