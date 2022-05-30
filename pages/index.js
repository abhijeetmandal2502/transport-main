import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSession, getSession } from 'next-auth/react';
import { Card, CardContent, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AccountBalanceOutlined,
  AccountBalanceSharp,
  ArrowRightSharp,
  AssignmentTurnedInOutlined,
  LocalShippingRounded,
  Print,
} from '@material-ui/icons';
import { AppRegistration, AppRegistrationOutlined } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
// import CNStatus from '../components/dashboard/CNStatus';
import CNStepper from '../components/dashboard/CNStepper';
import { useRouter } from 'next/router';
import shipTruck from '../public/img/ship-truck.png';
import Image from 'next/image';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home2({ data }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dataArr = data;

  const lrArr = dataArr.lr_count ? dataArr.lr_count : [];
  const userArr = dataArr.user_count ? dataArr.user_count : [];
  const vehicleArr = dataArr.vehicles ? dataArr.vehicles : [];

  function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }

  return (
    <Box>
      {/* <CssBaseline /> */}
      <div position="fixed" open={open}>
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </div>

      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button style={{ color: 'black' }}>
            <ListItemIcon>
              <AppRegistrationOutlined />
            </ListItemIcon>
            <Link href="/booking/new-booking">
              <ListItemText primary={'LR Generate'} />
            </Link>
          </ListItem>

          <ListItem button style={{ color: 'black' }}>
            <ListItemIcon>
              <LocalShippingRounded />
            </ListItemIcon>
            <Link href="/booking/vehicle-assignment">
              <ListItemText primary={'Vehicle Assign'} />
            </Link>
          </ListItem>

          <ListItem button style={{ color: 'black' }}>
            <ListItemIcon>
              <AssignmentTurnedInOutlined />
            </ListItemIcon>
            <Link href="/loading/bilty-generate">
              <ListItemText primary={'Bilty Generate'} />
            </Link>
          </ListItem>

          <ListItem button style={{ color: 'black' }}>
            <ListItemIcon>
              <Print />
            </ListItemIcon>
            <Link href="/loading/generated-bilty">
              <ListItemText primary={'Print Bilty'} />
            </Link>
          </ListItem>

          <ListItem button style={{ color: 'black' }}>
            <ListItemIcon>
              <AccountBalanceSharp />
            </ListItemIcon>
            <Link href="/account/advance-payment">
              <ListItemText primary={'Advance Payment'} />
            </Link>
          </ListItem>
        </List>
      </Drawer>

      <CNStepper />

      <Box
        sx={{
          display: { base: 'block', md: 'block' },
          marginY: 'auto',
          // alignItems: 'start',
        }}
      >
        {/* <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { base: '100%', md: '30%' },
            marginY: '15px',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            borderRadius="20px"
            placeholder="Search By CN No "
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper> */}

        {/* <CNStatus /> */}
      </Box>

      <Paper
        style={{
          padding: 20,
          marginBottom: 30,
          paddingTop: 10,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      >
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              LR Details
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {Object.keys(lrArr).map((key, item) => {
            console.log('chekcitemsss', key);
            return key != 'cancel' &&
              key != 'hold' &&
              key != 'active' &&
              key != 'closed' ? (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  var slug =
                    key == 'fresh'
                      ? `/booking/lr-booking`
                      : key == 'vehicle-assigned'
                      ? `/booking/vehicle-assignment`
                      : key == 'loading'
                      ? '/loading/bilty-generate'
                      : key == 'advance'
                      ? `/account/new-advance-payment`
                      : key == 'unload'
                      ? `/account/unload-vehicle`
                      : key == 'v-payment'
                      ? `/account/final-payment-list`
                      : key == 'c-payment'
                      ? `/account/pending-consignor-payment`
                      : '';
                  router.push(slug);
                }}
              >
                <motion.div whileHover={{ scale: 1.07 }} id="imghgt">
                  <Box>
                    <Paper style={{ position: 'relative ' }}>
                      <Card
                        variant="outlined"
                        style={{
                          height: '90px',
                          // paddingBottom: 24,
                          // border: '2px',
                          borderColor: '#FFD600',
                          borderWidth: '2px',
                          backgroundColor: '#FFF4BB',
                          // backgroundImage:
                          //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png), linear-gradient(45deg, #3ad11e42, transparent)',
                          backgroundSize: 'cover',
                        }}
                      >
                        <CardContent>
                          <Box
                            height="70px"
                            width="80px"
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 5,

                              // transform: 'scaleX(1) scaleY(2)',
                            }}
                          >
                            <Image src={shipTruck} objectFit="cover"></Image>
                          </Box>

                          <Typography
                            style={{ fontWeight: 600, fontSize: 14 }}
                            color="white"
                            gutterBottom
                            position="relative"
                            backgroundColor="#3f3e3e54"
                            width={'max-content'}
                            paddingX={'5px'}
                            borderRadius={'10px'}
                            // background="white"
                          >
                            {capitalize(key.replace(/_/g, ' '))} -
                          </Typography>
                          <Typography
                            style={{
                              background: 'white',
                              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                              width: 26,
                              display: 'flex',
                              border: '1px solid #cdcdcd',
                              borderRadius: 25,
                              justifyContent: 'center',
                              position: 'absolute',
                              bottom: 5,
                              right: 5,
                            }}
                          >
                            {lrArr[key]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Paper>
                  </Box>
                </motion.div>
              </Grid>
            ) : (
              <div></div>
            );
          })}
        </Grid>
      </Paper>

      <Paper
        style={{
          padding: 20,
          marginBottom: 30,
          paddingTop: 10,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      >
        {' '}
        {/* Vehicle details */}
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              Vehicle Details
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {vehicleArr &&
            Object.keys(vehicleArr).map((key, item) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={item}
                  sx={{ cursor: 'pointer' }}
                >
                  <motion.div whileHover={{ scale: 1.07 }} id="imghgt">
                    <Box>
                      <Paper style={{ position: 'relative ' }}>
                        <Card
                          variant="outlined"
                          style={{
                            height: '90px',
                            // paddingBottom: 24,
                            // border: '2px',
                            borderColor: '#FFD600',
                            borderWidth: '2px',
                            backgroundColor: '#FFF4BB',
                            // backgroundImage:
                            //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png), linear-gradient(45deg, #3ad11e42, transparent)',
                            backgroundSize: 'cover',
                          }}
                        >
                          <CardContent>
                            <Box
                              height="70px"
                              width="80px"
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 5,

                                // transform: 'scaleX(1) scaleY(2)',
                              }}
                            >
                              <Image src={shipTruck} objectFit="cover"></Image>
                            </Box>

                            <Typography
                              style={{ fontWeight: 600, fontSize: 14 }}
                              color="white"
                              gutterBottom
                              position="relative"
                              backgroundColor="#3f3e3e54"
                              width={'max-content'}
                              paddingX={'5px'}
                              borderRadius={'10px'}
                              // background="white"
                            >
                              {capitalize(key.replace(/_/g, ' '))} -
                            </Typography>
                            <Typography
                              style={{
                                background: 'white',
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                width: 26,
                                display: 'flex',
                                border: '1px solid #cdcdcd',
                                borderRadius: 25,
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                              }}
                            >
                              {vehicleArr[key]}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Paper>
                      {/* <Paper style={{ position: 'relative ' }}>
                        <Card
                          variant="outlined"
                          style={{
                            // paddingBottom: 24,
                            borderColor: '#FFD600',
                            borderWidth: '2px',
                            backgroundColor: '#FFF4BB',
                            // backgroundImage:
                            //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png),linear-gradient(45deg, rgb(70 176 223 / 55%), transparent)',
                            backgroundSize: 'cover',
                          }}
                        >
                          <CardContent>
                            <Typography
                              style={{ fontWeight: 600, fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {capitalize(key.replace(/_/g, ' '))} -{' '}
                            </Typography>
                            <Typography
                              style={{
                                background: 'white',
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                width: 26,
                                display: 'flex',
                                border: '1px solid #cdcdcd',
                                borderRadius: 25,
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                              }}
                            >
                              {vehicleArr[key]}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Paper> */}
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
      <Paper
        style={{
          padding: 20,
          marginBottom: 30,
          paddingTop: 1,
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
      >
        {' '}
        {/* Vehicle details */}
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              component="h4"
              sx={{ fontWeight: '600', fontSize: '1rem' }}
            >
              Employee Details
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {Object.keys(userArr).map((key, item) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <motion.div whileHover={{ scale: 1.07 }} id="imghgt">
                  <Box>
                    <Paper style={{ position: 'relative ' }}>
                      <Card
                        variant="outlined"
                        style={{
                          height: '90px',
                          // paddingBottom: 24,
                          // border: '2px',
                          borderColor: '#FFD600',
                          borderWidth: '2px',
                          backgroundColor: '#FFF4BB',
                          // backgroundImage:
                          //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png), linear-gradient(45deg, #3ad11e42, transparent)',
                          backgroundSize: 'cover',
                        }}
                      >
                        <CardContent>
                          <Box
                            height="70px"
                            width="80px"
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 5,

                              // transform: 'scaleX(1) scaleY(2)',
                            }}
                          >
                            <Image src={shipTruck} objectFit="cover"></Image>
                          </Box>

                          <Typography
                            style={{ fontWeight: 600, fontSize: 14 }}
                            color="white"
                            gutterBottom
                            position="relative"
                            backgroundColor="#3f3e3e54"
                            width={'max-content'}
                            paddingX={'5px'}
                            borderRadius={'10px'}
                            // background="white"
                          >
                            {capitalize(key.replace(/_/g, ' '))} -
                          </Typography>
                          <Typography
                            style={{
                              background: 'white',
                              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                              width: 26,
                              display: 'flex',
                              border: '1px solid #cdcdcd',
                              borderRadius: 25,
                              justifyContent: 'center',
                              position: 'absolute',
                              bottom: 5,
                              right: 5,
                            }}
                          >
                            {userArr[key]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Paper>
                    {/* <Paper style={{ position: 'relative ' }}>
                      <Card
                        variant="outlined"
                        style={{
                          // paddingBottom: 24,
                          borderColor: '#FFD600',
                          borderWidth: '2px',
                          backgroundColor: '#FFF4BB',
                          // backgroundImage:
                          //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png), linear-gradient(45deg, #3ad11e42, transparent)',
                          backgroundSize: 'cover',
                        }}
                      >
                        <CardContent>
                          <Typography
                            style={{ fontWeight: 600, fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {capitalize(key.replace(/_/g, ' '))} -
                          </Typography>
                          <Typography
                            style={{
                              background: 'white',
                              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                              width: 26,
                              display: 'flex',
                              border: '1px solid #cdcdcd',
                              borderRadius: 25,
                              justifyContent: 'center',
                              position: 'absolute',
                              bottom: 5,
                              right: 5,
                            }}
                          >
                            {userArr[key]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Paper> */}
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  // get token from session
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    var data = [];
    try {
      const req = await fetch(`${process.env.apiUrl}/dashboard`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });
      var res = await req.json();

      if (res.status === 'success') {
        data = res.data;
      } else {
        data = [];
      }
    } catch (error) {
      data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
