import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './Header';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1140px;
  padding: 30px;
`;

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
