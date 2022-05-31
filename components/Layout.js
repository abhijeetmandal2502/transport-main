import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react';
// import { useSession } from 'next-auth/react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

import { Box, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from '../utils/style';
import Header from './Header';
import NavMenu from '../components/menu/NavMenu';
import { MenuModel } from '../components/menu/MenuModel';
// import NavMenumobile from "./test/NavMenuMobile";
// import { MenuBookTwoTone, MenuTwoTone } from "@material-ui/icons";
import Login from '../pages/login';
import MainMenu from './menu/MainMenu';
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
// import NavMenu from '../components/menu/NavMenu';
import { Collapse, ListSubheader } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LocalShippingOutlined, StarBorder } from '@material-ui/icons';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import menuImage from '../public/Logo.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { textState } from './dashboard/CNStepper';
import Image from 'next/image';
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
} from '../utils/NavUtills';

import TrishaSidebar from './TrishaSidebar';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// import { AppRegistration, AppRegistrationOutlined } from '@mui/icons-material';
import {
  AccountBalanceOutlined,
  AccountBalanceSharp,
  ArrowRightSharp,
  AssignmentTurnedInOutlined,
  LocalShippingRounded,
  Print,
} from '@material-ui/icons';
import Navbar from './navbar/Navbar';

function Layout({ Session, children }) {
  // const { data: session, status } = useSession();
  const classes = useStyles();
  const { data: session, status } = useSession();
  const theme = useTheme();

  // const [menuArr, setMenuArr] = useState(MenuModel);
  // const [accordion, setAccordion] = useState(false);
  // const [openDeskTopNav, setOpenDeskTopNav] = useState(false);
  // const [openMobNav, setOpenMobNav] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [text, setText] = useRecoilState(textState);
  // const token = session && session.user.access_token;

  // useEffect(() => {
  //   setText('oka');
  // }, []);

  // const handleDrawerOpenForDesk = () => {
  //   setOpenDeskTopNav(true);
  // };

  // const handleDrawerCloseForDesk = () => {
  //   setOpenDeskTopNav(false);
  // };

  // const handleDrawerOpenForMob = () => {
  //   console.log('openMobNav', openMobNav);
  //   setOpenMobNav(true);
  // };

  // const handleDrawerCloseForMob = () => {
  //   setOpenMobNav(false);
  // };

  // const handleClick = () => {
  //   setAccordion(!accordion);
  // };

  if (status == 'loading') return null;

  return (
    <div>
      <Head>
        <title>Transportation Project</title>
      </Head>

      {status == 'authenticated' ? (
        <div>
          {/*  */}
          {/* <TrishaSidebar />
           */}
          {/* <MainMenu menuData={session.user.menu_access} /> */}

          {/* <Container className={classes.main}>{children}</Container> */}

          <Box>
            <CssBaseline />
            <Navbar menuData={session.user.menu_access} />
            <Box>
              {/* <DrawerHeader /> */}
              <Box
                sx={{
                  pr: { xs: '14px', sm: '34px' },
                  pl: { xs: '14px', sm: '34px' },
                }}
              >
                <Container pl={'20px'} className={classes.main}>
                  {children}
                </Container>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              {/* <Container className={classes.main}>{children}</Container> */}
            </Box>
          </Box>
        </div>
      ) : (
        <Login />
      )}

      <footer className={classes.footer}>
        <Typography>All right reserved. Transport</Typography>
      </footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  const sessionData = await getSession(context);

  return {
    props: {
      sessionData,
    },
  };
}
export default Layout;
