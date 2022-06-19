import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};
