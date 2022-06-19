import { Grid, Pagination, Typography } from '@mui/material';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { CharactersList } from '../components/CharactersList';
import { Loader } from '../components/Loader';
import { Character, useAllCharactersQuery } from '../graphql/graphql';
import { Title } from './Home';

const CustomPagination = styled(Pagination)`
  button[aria-current='true'] {
    color: white;
    background-color: #88be43;
  }
`;

export const Characters: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useAllCharactersQuery({
    variables: {
      page,
    },
  });

  const characters = data?.characters?.results as Character[];
  const info = data?.characters?.info;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return loading ? (
    <Loader />
  ) : (
    <Grid container direction="column" rowSpacing={2} alignItems="center">
      <Grid item>
        <Title variant="h3" sx={{ mb: 2 }}>
          Characters
        </Title>
      </Grid>
      <Grid item>
        <CharactersList characters={characters} />
      </Grid>
      <Grid item mt={3}>
        {info?.pages && (
          <CustomPagination
            count={info?.pages}
            page={page}
            onChange={handleChangePage}
          />
        )}
      </Grid>
    </Grid>
  );
};
