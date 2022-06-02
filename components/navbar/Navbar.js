import React, { useEffect, useState, useRef } from 'react';

import { Box, Toolbar, Typography, Button } from '@material-ui/core';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import useStyles from '../../utils/style';
import Header from '../Header';
import MenuModel from '../../components/menu/MenuModel';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container } from '@material-ui/core';
import { Collapse, ListSubheader } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LocalShippingOutlined, StarBorder } from '@material-ui/icons';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import menuImage from '../../public/img/header.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
// import { useDebounce } from 'use-debounce';
import { textState } from './../dashboard/CNStepper';
import Image from 'next/image';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  openedMixin,
  closedMixin,
  DrawerHeader,
  AppBar,
  DesktopDrawer,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MobileDrawerHeader,
} from '../../utils/NavUtills';
import { AppRegistration, AppRegistrationOutlined } from '@mui/icons-material';
import {
  AccountBalanceSharp,
  AssignmentTurnedInOutlined,
  LocalShippingRounded,
  Print,
} from '@material-ui/icons';
import { fontSize } from '@mui/system';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const Navbar = (props) => {
  const classes = useStyles();
  const { data: session, status } = useSession();
  const theme = useTheme();

  //   const [menuArr, setMenuArr] = useState(props.menuData);
  const [accordion, setAccordion] = useState(false);
  const [openDeskTopNav, setOpenDeskTopNav] = useState(false);
  const [openMobNav, setOpenMobNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [text, setText] = useRecoilState(textState);
  const token = session && session.user.access_token;

  //   this section is for creating menu
  var parentArr = [];
  var i = 0;
  for (var key in props.menuData) {
    var item = key;
    var childData = props.menuData[key];
    var tempArr = [];
    var j = 0;
    childData.map((item) => {
      tempArr.push({
        id: i,
        name: item.name,
        slug: '/' + item.category + '/' + item.slug,
      });
      j++;
    });

    parentArr.push({ id: i, title: item, items: tempArr });

    if (childData != null) {
    }
    i++;
  }
  const [menuArr, setMenuArr] = useState(parentArr);

  //  process  end for create menu

  useEffect(() => {
    setText('oka');
  }, []);

  const handleDrawerOpenForDesk = () => {
    setOpenDeskTopNav(true);
  };

  const handleDrawerCloseForDesk = () => {
    setOpenDeskTopNav(false);
    setAccordion();
  };

  const handleDrawerOpenForMob = () => {
    console.log('openMobNav', openMobNav);
    setOpenMobNav(true);
  };

  const handleDrawerCloseForMob = () => {
    setOpenMobNav(false);
  };

  const handleClick = () => {
    setAccordion(!accordion);
  };

  console.log('checkmenusaurabh', menuArr);

  return (
    <div>
      <AppBar
        elevation="0px"
        position="fixed"
        open={openDeskTopNav}
        style={{ backgroundColor: '#5B6073' }}
      >
        <Toolbar>
          <Box
            width={'100%'}
            sx={{
              my: { xs: '10px', sm: '10px', md: '0px' },
              justifyContent: 'space-between',
              display: { xs: 'block', sm: 'flex', md: 'flex' },
            }}
          >
            <Box
              // justifyContent={'space-between'
              sx={{
                justifyContent: {
                  xs: 'space-between',
                  sm: 'space-between',
                  md: 'start',
                },
                display: 'flex',
                // width: '100%',
              }}
            >
              <IconButton
                // color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpenForMob}
                edge="start"
                sx={{ mr: 2, ...(openDeskTopNav && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>

              <Link href="/">
                <Box cursor="pointer">
                  <Image src={menuImage} alt="" width={'200px'} height="50px" />
                </Box>
              </Link>

              <Box>
                <AccountCircle
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    width: '40px',
                    height: '40px',
                    marginLeft: '20px',
                    display: { xs: 'block', sm: 'none', md: 'none' },
                  }}
                />
              </Box>
            </Box>
            <Box
              // height={'40px'}
              alignItems={'center'}
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'space-evenly',
                  sm: 'space-evenly',
                  md: 'start',
                },
                // alignItems: 'center',
                mt: { xs: '10px', sm: '10px', md: '0px' },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  color="orange"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSubmit={(e) => {
                    console.log('checksubmit');
                  }}
                />
              </Search>
              <Box width={'10px'}></Box>
              <Button
                // marginLeft={'5px'}
                // paddingLeft={'10px'}
                onClick={() => {
                  if (searchTerm != null) {
                    setText(searchTerm);
                  }
                  // console.log('checkfirst');
                }}
                variant="contained"
                color="blue"
                size="small"
                // sx={{ height: '30px' }}
                // autoFocus
              >
                Submit
              </Button>

              <AccountCircle
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  width: '40px',
                  height: '40px',
                  marginLeft: '20px',
                  display: { xs: 'none', sm: 'block', md: 'block' },
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* drawer for mobile  */}

      <Drawer
        open={openMobNav}
        variant="persistent"
        anchor="left"
        // backgroundColor="#686c7e"
        className="sidebarclr"
        width="50px"
      >
        <MobileDrawerHeader>
          <IconButton onClick={handleDrawerCloseForMob}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </MobileDrawerHeader>
        <Divider />
        {/* <List>
          {menuArr.map((item, index) => {
            return (
              <ListItem button style={{ color: 'black' }}>
                <ListItemIcon>
                  <AppRegistrationOutlined />
                </ListItemIcon>
                <Link href="/booking/new-booking">
                  <ListItemText primary={item.title.toUpperCase()} />
                </Link>
              </ListItem>
            );
          })}
        </List> */}
        <List sx={{ mr: '15px' }}>
          {menuArr.map((menu, index) => {
            console.log('checkmenuitems', menu);
            return (
              <>
                <ListItemButton
                  onClick={() => {
                    if (menu.items.length > 0) {
                      //   handleClick();
                      // menu.items;
                      //   if (menu.items != accordion) {
                      //     setAccordion();
                      //   }

                      if (menu.items !== accordion) {
                        setAccordion(menu.items);
                      } else {
                        // setOpenDeskTopNav(false);
                        setAccordion();
                      }
                    }
                  }}
                  className="hoversidebar"
                  sx={{
                    ':hover': { background: '#7D86A5' },
                    borderRadius: '0px 45px 47.5px 0px',
                  }}
                >
                  {/* <ListItemIcon sx={{ color: '#FFD600' }}>
                    <InboxIcon
                      onClick={() => {
                        // if (openDeskTopNav) {
                        //   handleDrawerCloseForDesk();
                        // } else {
                        handleDrawerOpenForDesk();
                        // }
                      }}
                    />
                  </ListItemIcon> */}
                  <ListItemText
                    // primary={menu.title.toUpperCase()}
                    secondary={menu.title.toUpperCase()}
                    secondaryTypographyProps={{
                      color: 'white',
                      fontSize: '10px ',
                    }}
                    sx={{ color: 'white', fontSize: '10px !important' }}
                  />
                  {menu.items == accordion ? (
                    <ExpandLess sx={{ color: '#FFD600' }} />
                  ) : (
                    <ExpandMore sx={{ color: '#FFD600' }} />
                  )}
                </ListItemButton>
                <Collapse
                  in={menu.items == accordion ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {menu.items.map((subMenu) => {
                      return (
                        <Link href={subMenu.slug}>
                          <ListItemButton
                            className="hoversidebar"
                            sx={{
                              pl: 4,
                              ':hover': { background: '#7D86A5' },
                              borderRadius: '0px 45px 47.5px 0px',
                            }}
                            onClick={handleDrawerCloseForDesk}
                          >
                            {/* <ListItemIcon sx={{ color: '#FFD600' }}>
                              <StarBorder />
                            </ListItemIcon> */}
                            {/* <Typography
                              fontSize="10px"
                              sx={{
                                fontSize: '5px',
                                fontWeight: '700',
                              }}
                            >
                              {subMenu.name}
                            </Typography> */}
                            <ListItemText
                              secondary={subMenu.name}
                              secondaryTypographyProps={{
                                color: 'white',
                                fontSize: '8px ',
                              }}
                              sx={{ color: 'white', fontSize: 'xs' }}
                            />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
      </Drawer>

      {/* drawer for desktop */}
      <DesktopDrawer
        variant="permanent"
        open={openDeskTopNav}
        className="sidebarclr"
        sx={{ display: { xs: 'none', sm: 'none', md: 'contents' } }}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between', px: '16px' }}>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenForDesk}
            edge="start"
            sx={{
              mr: 2,
              ...(openDeskTopNav && { display: 'none' }),
              color: 'white',
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* <Typography sx={{ fontSize: '20px', fontWeight: '700', color: 'white', ...(open && { display: 'block' }), }}   >
                        TA Sidcul
                    </Typography> */}

          <IconButton onClick={handleDrawerCloseForDesk}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon style={{ fontSize: '30px', color: 'white' }} />
            ) : (
              <ChevronLeftIcon style={{ fontSize: '30px', color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List sx={{ mr: '15px' }}>
          {menuArr.map((menu, index) => {
            console.log('checkmenuitems', menu);
            return (
              <>
                <ListItemButton
                  onClick={() => {
                    if (menu.items.length > 0) {
                      //   handleClick();
                      // menu.items;
                      //   if (menu.items != accordion) {
                      //     setAccordion();
                      //   }

                      if (menu.items !== accordion) {
                        setAccordion(menu.items);
                      } else {
                        // setOpenDeskTopNav(false);
                        setAccordion();
                      }
                    }
                  }}
                  className="hoversidebar"
                  sx={{
                    ':hover': { background: '#7D86A5' },
                    borderRadius: '0px 45px 47.5px 0px',
                  }}
                >
                  <ListItemIcon sx={{ color: '#FFD600' }}>
                    {menu.title.toLowerCase() == 'loading' ? (
                      <HourglassBottomIcon onClick={handleDrawerOpenForDesk} />
                    ) : menu.title.toLowerCase() == 'settings' ? (
                      <SettingsIcon onClick={handleDrawerOpenForDesk} />
                    ) : menu.title.toLowerCase() == 'admin' ? (
                      <AdminPanelSettingsIcon
                        onClick={handleDrawerOpenForDesk}
                      />
                    ) : menu.title.toLowerCase() == 'account' ? (
                      <AccountCircleIcon onClick={handleDrawerOpenForDesk} />
                    ) : (
                      <InboxIcon onClick={handleDrawerOpenForDesk} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    // primary={menu.title.toUpperCase()}
                    secondary={menu.title.toUpperCase()}
                    secondaryTypographyProps={{ color: 'white' }}
                    sx={{ color: 'white', fontSize: '10px !important' }}
                  />
                  {menu.items == accordion ? (
                    <ExpandLess sx={{ color: '#FFD600' }} />
                  ) : (
                    <ExpandMore sx={{ color: '#FFD600' }} />
                  )}
                </ListItemButton>
                <Collapse
                  in={menu.items == accordion ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menu.items.map((subMenu) => {
                      return (
                        <Link href={subMenu.slug}>
                          <ListItemButton
                            className="hoversidebar"
                            sx={{
                              pl: 4,
                              ':hover': { background: '#7D86A5' },
                              borderRadius: '0px 45px 47.5px 0px',
                            }}
                            onClick={handleDrawerCloseForDesk}
                          >
                            {/* <ListItemIcon sx={{ color: '#FFD600' }}>
                              <StarBorder />
                            </ListItemIcon> */}
                            {/* <Typography
                              fontSize="10px"
                              sx={{
                                fontSize: '5px',
                                fontWeight: '700',
                              }}
                            >
                              {subMenu.name}
                            </Typography> */}
                            <ListItemText
                              secondary={subMenu.name}
                              secondaryTypographyProps={{ color: 'white' }}
                              sx={{ color: 'white', fontSize: 'xs' }}
                            />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
      </DesktopDrawer>
    </div>
  );
};

export default Navbar;
