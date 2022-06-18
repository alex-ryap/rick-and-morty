import { FC } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { Menu } from './Menu';
import { NavLink } from 'react-router-dom';
import { HOME_PAGE } from '../utils/constants';

const HeaderContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: #00afc7; */
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <NavLink to={HOME_PAGE}>
        <Logo src={logo} alt="" />
      </NavLink>
      <Menu />
    </HeaderContainer>
  );
};
