import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
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
import NavMenu from '../components/menu/NavMenu';
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

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${theme.spacing(8)})`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

// for search

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#ECECEC',
  // '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#B7B7B7',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //     width: '12ch',
    //     '&:focus': {
    //         width: '20ch',
    //     },
    // },
  },
}));

export default function TrishaSidebar({ Session, children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [accordion, setAccordion] = React.useState(false);

  const handleClick = () => {
    setAccordion(!accordion);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        elevation="0px"
        position="fixed"
        open={open}
        style={{ backgroundColor: 'white' }}
      >
        <Toolbar
          style={{ justifyContent: 'space-between', px: '0px !important' }}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            mt: { xs: '0px', sm: '0px' },
            px: { xs: '24px', sm: '44px' },
          }}
        >
          <Link href="/booking/new-booking">
            <Box>
              <Typography
                sx={{ fontSize: '40px', color: '#657ED7', fontWeight: '700' }}
              >
                TA Sidcul
              </Typography>
            </Box>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <AccountCircle
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                width: '40px',
                height: '40px',
                marginLeft: '20px',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="sidebarclr">
        <DrawerHeader sx={{ justifyContent: 'space-between', px: '16px' }}>
          <LocalShippingOutlined
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ fontSize: '30px', color: 'white' }}
          />
          {/* <Typography sx={{ fontSize: '20px', fontWeight: '700', color: 'white', ...(open && { display: 'block' }), }}   >
                        TA Sidcul
                    </Typography> */}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon style={{ fontSize: '30px', color: 'white' }} />
            ) : (
              <ChevronLeftIcon style={{ fontSize: '30px', color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List sx={{ mr: '15px' }}>
          <ListItemButton
            className="hoversidebar"
            sx={{
              ':hover': { background: '#7D86A5' },
              borderRadius: '0px 45px 47.5px 0px',
            }}
          >
            <ListItemIcon sx={{ color: '#FFD600' }}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" sx={{ color: 'white' }} />
          </ListItemButton>

          <ListItemButton
            onClick={handleClick}
            className="hoversidebar"
            sx={{
              ':hover': { background: '#7D86A5' },
              borderRadius: '0px 45px 47.5px 0px',
            }}
          >
            <ListItemIcon sx={{ color: '#FFD600' }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" sx={{ color: 'white' }} />
            {accordion ? (
              <ExpandLess sx={{ color: '#FFD600' }} />
            ) : (
              <ExpandMore sx={{ color: '#FFD600' }} />
            )}
          </ListItemButton>

          <Collapse in={accordion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className="hoversidebar"
                sx={{
                  pl: 4,
                  ':hover': { background: '#7D86A5' },
                  borderRadius: '0px 45px 47.5px 0px',
                }}
              >
                <ListItemIcon sx={{ color: '#FFD600' }}>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" sx={{ color: 'white' }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>

      <Box sx={{ px: { xs: '24px', sm: '44px' } }}>
        <DrawerHeader />

        <Box sx={{ py: { xs: '54px', sm: '24px' } }}>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. dio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac. Consequat mauris nunc
            congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque
            volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu
            facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus
            viverra accumsan in. In hendrerit gravida rutrum quisque non tellus
            orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi
            tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
            Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
            sollicitudin aliquam ultrices sagittis orci a.
          </Typography> */}
          <Container>{children}</Container>
        </Box>
      </Box>
    </Box>
  );
}
