// import * as React from "react";

// export default function NavMenuMobile() {
//     // const [state, setState] = React.useState({
//     //   top: false,
//     //   left: false,
//     //   bottom: false,
//     //   right: false,
//     // });

//     // const toggleDrawer = (anchor, open) => (event) => {
//     //   if (
//     //     event &&
//     //     event.type === "keydown" &&
//     //     (event.key === "Tab" || event.key === "Shift")
//     //   ) {
//     //     return;
//     //   }

//     //   setState({ ...state, [anchor]: open });
//     // };

//     // const list = (anchor) => (
//     //   <Box
//     //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
//     //     role="presentation"
//     //     onClick={toggleDrawer(anchor, false)}
//     //     onKeyDown={toggleDrawer(anchor, false)}
//     //   >
//     //     <List>
//     //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//     //         <ListItem button key={text}>
//     //           <ListItemIcon>
//     //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//     //           </ListItemIcon>
//     //           <ListItemText primary={text} />
//     //         </ListItem>
//     //       ))}
//     //     </List>
//     //     <Divider />
//     //     <List>
//     //       {["All mail", "Trash", "Spam"].map((text, index) => (
//     //         <ListItem button key={text}>
//     //           <ListItemIcon>
//     //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//     //           </ListItemIcon>
//     //           <ListItemText primary={text} />
//     //         </ListItem>
//     //       ))}
//     //     </List>
//     //   </Box>
//     // );

//     return (
//         <div>
//             {/* {["left", "right", "top", "bottom"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//           </SwipeableDrawer>
//         </React.Fragment>
//       ))} */}
//         </div>
//     );
// }
