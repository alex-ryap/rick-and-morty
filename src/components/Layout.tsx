import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1160px;
  padding: 0 20px;
  margin: 0 auto;
`;

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
