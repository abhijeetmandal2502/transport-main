import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import BtnNewBooking from '../../components/buttons/NewBooking';
import TableComponent from '../../components/TableComponent';
import { useSession, getSession } from 'next-auth/react';

const LocationList = ({ result }) => {
  const [rowsData, setRowsData] = useState(result);

  const rows = [];

  var i = 1;
  rowsData.map((item) => {
    rows.push([i + '.', item.location.toUpperCase(), item.active_status]);
    i++;
  });

  var totalPages = Math.ceil(rows.length / 10);

  const column = ['#', 'Location Name', 'status'];

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.location.toLowerCase().includes(searchValue.toLowerCase());
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(result);
  };

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
              List of Location
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              <BtnNewBooking
                url={'/settings/add-new-location'}
                name={'Add New Location'}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <TableComponent
        column={column}
        rows={rows}
        totalPages={totalPages}
        searchName={'Search Via Location name'}
        searchString={searchString}

      />
    </>
  );
};

export default LocationList;

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx);
  if (session != undefined) {
    const token = session.user.access_token;

    const res = await fetch(`${process.env.apiUrl}/locations`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      var result = data.data;
    } else {
      var result = [];
    }

  }
  else {
    var result = [];
  }


  // Pass data to the page via props
  return { props: { result } };
}
