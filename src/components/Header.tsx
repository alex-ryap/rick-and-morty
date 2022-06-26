import { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  CHARACTERS_PAGE,
  EPISODES_PAGE,
  HOME_PAGE,
  LOCATIONS_PAGE,
} from '../utils/constants';

const HeaderContent = styled.div`
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 668px) {
    gap: 10px;
  }
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #777;
  transition: 0.3s all;

  &:hover {
    color: #93be61;
  }

  &.active {
    color: #00afc7;
  }

  @media (max-width: 1040px) {
    font-size: 1.3rem;
  }

  @media (max-width: 668px) {
    font-size: 1rem;
  }
`;

const menuItems = [
  {
    title: 'Home',
    link: HOME_PAGE,
  },
  {
    title: 'Characters',
    link: CHARACTERS_PAGE,
  },
  {
    title: 'Locations',
    link: LOCATIONS_PAGE,
  },
  {
    title: 'Episodes',
    link: EPISODES_PAGE,
  },
];

export const Header: FC = () => {
  return (
    <HeaderContent>
      <HeaderNav>
        {menuItems.map((menuItem, idx) => (
          <CustomNavLink key={idx} to={menuItem.link}>
            {menuItem.title}
          </CustomNavLink>
        ))}
      </HeaderNav>
    </HeaderContent>
  );
};
