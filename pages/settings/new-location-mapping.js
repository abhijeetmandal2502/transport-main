import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import AddLocationMappingcmpnt from '../../components/settings/AddLocationMappingcmpnt';
import BackButton from '../../components/buttons/BackButton';
import { useSession, getSession } from 'next-auth/react';
import useSWR, { useSWRConfig } from 'swr';
const NewLocationMapping = ({ data }) => {
  const { mutate } = useSWRConfig()
  return (
    <>
      <BreadCrumb />
      <Grid
        container
        style={{
          marginBottom: { sx: 4, md: 15 },
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          style={{
            marginBottom: 4,
            display: 'flex',
          }}
        >
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            New Location Mapping
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Box
            style={{
              marginBottom: 4,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <BackButton url={'/settings/location-mapping'} onClick={() => {
              mutate(`${process.env.apiUrl}/all-rates`)

            }} />
          </Box>
        </Grid>
      </Grid>

      <AddLocationMappingcmpnt data={data} />
    </>
  );
};

export default NewLocationMapping;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    try {
      const res = await fetch(`${process.env.apiUrl}/locations`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      var data = [];
      if (result.status === 'success') {
        var location = result.data;
      } else {
        var location = [];
      }

      const res1 = await fetch(`${process.env.apiUrl}/vendors`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result1 = await res1.json();

      var vendorList = [];
      if (result1.status === 'success') {
        vendorList = result1.data;
      }

      data = {
        locations: location,
        vendorList: vendorList,
      };
    } catch (err) {
      data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
