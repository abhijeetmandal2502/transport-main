import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';

import BreadCrumb from '../../components/BreadCrumb';
import BiltyGenerateTable from '../../components/loading/BiltyGeneratetable';
import { useSession, getSession } from 'next-auth/react';
import DataNotAvl from '../../components/DataNotAvl';

const BiltyGenerate = ({ biltyData }) => {


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
              List of Bilty Generate
            </Typography>
          </Grid>
        </Grid>

        {biltyData !== [] ? (
          <BiltyGenerateTable biltyData={biltyData} />
        ) : (
          <DataNotAvl />
        )}
      </Container>
    </>
  );
};

export default BiltyGenerate;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(
      `${process.env.apiUrl}/lr-bookings-status/vehicle-assigned`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const biltyRes = await res.json();

    if (biltyRes.status === 'success') {
      var biltyData = biltyRes;
    } else {
      var biltyData = [];
    }
  } else {
    var biltyData = [];
  }
  // Pass data to the page via props
  return { props: { biltyData } };
}
