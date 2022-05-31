// import {
//   Menu,
//   Inbox,
//   Drafts,
//   Send,
//   ExpandLess,
//   ExpandMore,
//   StarBorder,
//   Close,
// } from '@material-ui/icons';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Button,
//   Collapse,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemButton,
//   ListItemText,
//   MenuItem,
//   Typography,
//   Divider,
//   Icon,
//   Spacer,
// } from '@mui/material';
// import React, { useState } from 'react';
// import Drawer from '@mui/material/Drawer';
// import NavMenu from './NavMenu';
// // import { MenuModel } from './MenuModel';
// import Image from 'next/image';
// import logo from '../../public/img/Ta_Sidcul__white_-removebg-preview.png';
// import Link from 'next/link';
// import { AppBar, Container, Toolbar } from '@material-ui/core';

// import { useSession, signIn, signOut, getSession } from 'next-auth/react';
// import { padding } from '@mui/system';
// import { capitalize } from '@material-ui/core';

// export default function MainMenu(props) {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   // sidebar menu

//   const [state, setState] = useState({
//     left: false,
//   });

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({
//       left: open,
//     });
//   };

//   //   this section is for creating menu
//   var parentArr = [];
//   var i = 0;
//   for (var key in props.menuData) {
//     var item = key;
//     var childData = props.menuData[key];
//     var tempArr = [];
//     var j = 0;
//     childData.map((item) => {

//       tempArr.push({
//         id: i,
//         name: item.name,
//         slug: '/' + item.category + '/' + item.slug,
//       });
//       j++;
//     });

//     parentArr.push({ id: i, title: item, items: tempArr });

//     if (childData != null) {
//     }
//     i++;
//   }
//   const [menuArr, setMenuArr] = useState(parentArr);
//   const { data: session, status } = useSession();

//   const token = session.user.access_token;

//   const logOutMethod = async () => {
//     const res = await fetch(`${process.env.apiUrl}/logout`, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//       method: 'POST',
//     })
//       .then((value) => {
//         router.push('/login');
//         signOut();
//       })
//       .catch((error) => { });
//   };
//   return (
//     <AppBar
//       position="sticky"
//       style={{ background: '#1c4e80', height: 80, justifyContent: 'center' }}
//       elevation={6}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* <Grid container style={{ alignItems: 'center' }}> */}
//           <Grid item xs={2} sx={{ display: { xs: 'flex', sm: 'none' } }}>
//             {/* menu for mobile */}
//             <Button
//               onClick={toggleDrawer(true)}
//               style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)' }}
//             >
//               <Menu />
//             </Button>
//             {/* end of  menu for mobile */}
//           </Grid>

//           <Grid item xs={8} sm={4} style={{ textAlign: 'start' }}>
//             <Link href='/'><Image src={logo} alt="" /></Link>

//           </Grid>

//           <Grid item xs={2} sm={8} sx={{ display: { xs: 'none', sm: 'flex' } }}>
//             {menuArr.map((menuData, key) => {
//               return <NavMenu props={menuData} key={key} />;
//             })}
//             <Button
//               style={{
//                 color: 'white',
//                 textTransform: 'capitalize',
//                 fontWeight: '600',
//                 fontSize: '16px',
//               }}
//               id="demo-positioned-button"
//               onClick={() => {
//                 logOutMethod();
//               }}
//             >
//               Logout
//             </Button>
//           </Grid>
//           {/* </Grid> */}

//           <Collapse>
//             <MobileNav
//               handleClick={handleClick}
//               open={open}
//               state={state}
//               toggleDrawer={toggleDrawer}
//               menuArr={menuArr}
//               logOutMethod={logOutMethod}
//             />
//           </Collapse>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// const MobileNav = ({
//   handleClick,
//   open,
//   state,
//   toggleDrawer,
//   menuArr,
//   logOutMethod,
// }) => {
//   const [handleData, setHandleData] = useState();

//   return (
//     <>
//       <Drawer
//         anchor="left"
//         open={state['left']}
//         onClose={toggleDrawer(false)}
//         id="drawer-div"
//       // color="white"
//       >
//         <Box
//           role="presentation"
//           sx={{
//             // width: 300,
//             // height: 300,
//             backgroundColor: 'primary.dark',
//             '&:hover': {
//               backgroundColor: '#1c4e80',
//               opacity: [0.9, 0.8, 0.7],
//             },
//           }}
//         // onClick={toggleDrawer(false)}
//         // onKeyDown={toggleDrawer(false)}
//         >
//           {/* <Icon
//             style={{ position: 'absolute', right: 0 }}
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//             sx={{ color: 'white',  }}
//             // style={}
//           >
//             <Close />
//           </Icon> */}
//           <Link href="/">
//             <Box
//               style={{ padding: 10, textAlign: 'center', marginTop: 20 }}
//               onClick={toggleDrawer(false)}
//             >
//               <Image src={logo} />
//             </Box>
//           </Link>
//           <Divider />
//           <List
//             sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//             component="nav"
//             aria-labelledby="nested-list-subheader"
//             id="menu-List"
//           >
//             {menuArr.map((item, key) => {
//               const items = item.items;

//               return (
//                 <span key={key}>
//                   <ListItemButton
//                     onClick={() => {
//                       setHandleData(item.title);
//                       if (handleData !== null && handleData !== undefined) {
//                         setHandleData();
//                         // setHandleData(item.title);
//                       }
//                       if (handleData !== item.title) {
//                         setHandleData(item.title);
//                       }
//                     }}
//                   >
//                     <ListItemText>{capitalize(item.title)}</ListItemText>
//                     {handleData == item.title ? <ExpandLess /> : <ExpandMore />}
//                   </ListItemButton>
//                   {items !== undefined
//                     ? items.map((child, key) => {
//                       return (
//                         <Collapse
//                           in={handleData == item.title ? true : false}
//                           timeout="auto"
//                           unmountOnExit
//                           id="Collapse-List"
//                           key={key}
//                         >
//                           <List component="div" disablePadding>
//                             <ListItemButton sx={{ pl: 4 }}>
//                               <Link href={child.slug}>
//                                 <ListItemText onClick={toggleDrawer(false)}>
//                                   {child.name}
//                                 </ListItemText>
//                               </Link>
//                             </ListItemButton>
//                           </List>
//                         </Collapse>
//                       );
//                     })
//                     : null}
//                 </span>
//               );
//             })}
//             <ListItemButton onClick={logOutMethod}>
//               <Link href="/">
//                 <ListItemText onClick={toggleDrawer(false)}>
//                   Log out
//                 </ListItemText>
//               </Link>
//             </ListItemButton>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };
