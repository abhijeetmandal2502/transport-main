import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import AdvancePaymentTable from '../../components/account/AdvancePaymentTable';
import { useSession, getSession } from 'next-auth/react';
import NoDataAvl from '../../components/DataNotAvl';
const AdvancePayment = ({ cnDetails }) => {

  console.log("cn details :", cnDetails)

  return (
    <>
      <BreadCrumb />

      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              List of Payment
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            ></Box>
          </Grid>
        </Grid>

        {cnDetails.data != undefined && cnDetails.data != null ? (
          <AdvancePaymentTable cnDetails={cnDetails} />
        ) : (
          <NoDataAvl />
        )}
      </Container>
    </>
  );
};

export default AdvancePayment;
export async function getServerSideProps(ctx) {
  // Fetch data from external API

  // get token from session
  const session = await getSession(ctx);

  if (session !== null && session !== undefined) {
    const token = session.user.access_token;


    try {
      const biltyRes = await fetch(
        `${process.env.apiUrl}/lr-bookings-status/loading`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          // method: 'POST',
        }
      );
      var cnDetails = await biltyRes.json();
    } catch (error) {

    }
  } else {
    var cnDetails = [];
  }

  // Pass data to the page via props
  return { props: { cnDetails } };
}
