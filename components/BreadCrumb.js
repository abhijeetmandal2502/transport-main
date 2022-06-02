import { Box, Container, Grid, Typography } from '@material-ui/core';
import { capitalize } from '@material-ui/core';
import { DoubleArrow } from '@material-ui/icons';
import React from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import BtnNewBooking from './buttons/NewBooking';

const BreadCrumb = (props) => {
  const router = useRouter();
  const path = router.asPath;
  const breadCrumbArr = path.split('/');

  const exactMenu = breadCrumbArr[1];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // check session
  const { data: session, status } = useSession();

  const pageAccessArr = session.user.page_access;
  // to match string from breadcrumb
  const bStr = breadCrumbArr[1] + '/' + breadCrumbArr[2];

  const pageAcc = ['/'];
  for (var key in pageAccessArr) {
    const item = pageAccessArr[key]['url'];
    pageAcc.push(item);
  }

  if (!pageAcc.includes(bStr)) {
    enqueueSnackbar('You dont Have Permission to access this page', {
      variant: 'error',
      // autoHideDuration: 3000,
    });
    // router.push('/');
  }

  return (
    <>
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <Typography variant="p" component="p" marginTop={'20px'}>
          {breadCrumbArr.map((item, key) => {
            if (item === '') {
              var name = 'home';
            } else {
              var name = item.replace(/-/g, ' ');
            }

            return (
              <span key={key}>
                {capitalize(name)}
                {key < breadCrumbArr.length - 1 ? (
                  <DoubleArrow
                    style={{
                      fontSize: '12px',
                      color: 'gray',
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  />
                ) : null}
              </span>
            );
          })}
        </Typography>
      </Container>
    </>
  );
};

export default BreadCrumb;
