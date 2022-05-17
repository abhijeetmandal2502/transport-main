import { Box, Container, Grid, Typography } from '@material-ui/core';
import BreadCrumb from '../../components/BreadCrumb';
import BtnNewBooking from '../../components/buttons/NewBooking';
import TableComponent from '../../components/TableComponent';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';

const LocationMapping = ({ data }) => {
  const [rowsData, setRowsData] = useState(data);
  const [searchValue, setSearchValue] = useState('');


  const tempData = [];
  var i = 1;
  for (var x in rowsData) {

    var vendorName = capitalizeWords(x.replace(/_/g, ' '));
    var childArr = rowsData[x];

    for (var key in childArr) {
      var location = key.split("_");
      var from = capitalizeWords(location[0]);
      var to = capitalizeWords(location[1]);
      var vehicledata = childArr[key];
      var tempArr = [];
      for (var k in vehicledata) {
        var type = vehicledata[k]['type'];
        var own_rate = vehicledata[k]['own_rate'];
        var vendor_rate = vehicledata[k]['vendor_rate'];

        tempData.push([i, vendorName, from, to, type, own_rate, vendor_rate])

        i++;
      }


    }
  }

  // capitalize letters via function
  function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  const searchString = (searchValue) => {


  };

  const reset = () => {
    setRowsData(data);
  };

  const totalPages = Math.ceil(tempData.length / 10);

  const column = [
    '#',
    'Consignor',
    'From',
    'To',
    'Vehicle Type',
    'Owner Rate',
    'TA Rate',
  ];

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
                url={'/settings/new-location-mapping'}
                name={'Manage Location'}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <TableComponent
        column={column}
        rows={tempData}
        searchName={''}
        searchString={searchString}
        totalPages={totalPages}
      />
    </>
  );
};

export default LocationMapping;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/all-rates`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (result.status === 'success') {
      var data = result.data;
    } else {
      var data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
