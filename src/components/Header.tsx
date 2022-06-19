import { FC, useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { NavLink } from 'react-router-dom';
import {
  CHARACTERS_PAGE,
  EPISODES_PAGE,
  HOME_PAGE,
  LOCATIONS_PAGE,
} from '../utils/constants';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  color: #88be43;
  transition: 0.3s all;

  &.active {
    color: #00afc7;
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
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to={HOME_PAGE}>
            <Logo src={logo} alt="" />
          </NavLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((menuItem, idx) => (
                <MenuItem key={idx}>
                  <CustomNavLink to={menuItem.link}>
                    {menuItem.title}
                  </CustomNavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {menuItems.map((menuItem, idx) => (
              <MenuItem key={idx}>
                <CustomNavLink to={menuItem.link}>
                  {menuItem.title}
                </CustomNavLink>
              </MenuItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  // return (
  //   <HeaderBackground>
  //     <HeaderContainer>
  //       <NavLink to={HOME_PAGE}>
  //         <Logo src={logo} alt="" />
  //       </NavLink>
  //       <Menu />
  //     </HeaderContainer>
  //   </HeaderBackground>
  // );
};
