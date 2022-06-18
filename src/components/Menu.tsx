import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  CHARACTERS_PAGE,
  EPISODES_PAGE,
  LOCATIONS_PAGE,
} from '../utils/constants';

const NavList = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
  list-style-type: none;
`;

const NavItem = styled.li`
  font-size: 20px;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  color: #88be43;

  &.active {
    color: #00afc7;
  }
`;

export const Menu: FC = () => {
  return (
    <nav>
      <NavList>
        <NavItem>
          <CustomNavLink to={CHARACTERS_PAGE}>Chatacters</CustomNavLink>
        </NavItem>
        <NavItem>
          <CustomNavLink to={LOCATIONS_PAGE}>Locations</CustomNavLink>
        </NavItem>
        <NavItem>
          <CustomNavLink to={EPISODES_PAGE}>Epizodes</CustomNavLink>
        </NavItem>
      </NavList>
    </nav>
  );
};
