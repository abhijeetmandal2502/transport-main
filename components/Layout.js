import Head from 'next/head';
import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import useStyles from '../utils/style';
import Header from './Header';
import NavMenu from '../components/menu/NavMenu';
import { MenuModel } from '../components/menu/MenuModel';
// import NavMenumobile from "./test/NavMenuMobile";
// import { MenuBookTwoTone, MenuTwoTone } from "@material-ui/icons";
import Login from '../pages/login';
import MainMenu from './menu/MainMenu';

function Layout({ Session, children }) {
  // const { data: session, status } = useSession();
  const classes = useStyles();


  const [menuArr, setMenuArr] = useState(MenuModel);
  const { data: session, status } = useSession();

  const token = session && session.user.access_token;


  if (status == 'loading') return null;
  return (
    <div>
      <Head>
        <title>Transportation Project</title>
      </Head>

      {status == 'authenticated' ? (
        <div>
          {/*  */}
          <MainMenu menuData={session.user.menu_access} />
          <Container className={classes.main}>{children}</Container>
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
