import { Box, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import BtnNewBooking from '../../components/buttons/NewBooking';
import TableComponent from '../../components/TableComponent';
import { useSession, getSession } from 'next-auth/react';

const VehicleCategory = ({ data }) => {

  const [rowsData, setRowsData] = useState(data);

  const rows = [];

  var i = 1;
  rowsData.map((item) => {
    if (item.status === 'active') {
      const type = 'Available';
    }
    rows.push([i + '.', item.type_name.toUpperCase(), type]);
    i++;
  });

  var totalPages = Math.ceil(rows.length / 10);

  const column = ['#', 'Vehicle Type', 'status'];

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
                url={'/settings/add-vehicle-type'}
                name={'Add Vehicle Type'}
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

export default VehicleCategory;

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    const req = await fetch(`${process.env.apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();

    if (res.status === 'success') {
      var data = res.data;
    } else {
      var data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
