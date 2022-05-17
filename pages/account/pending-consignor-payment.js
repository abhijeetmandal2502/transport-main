import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import TableComponent from '../../components/TableComponent';
import { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/router';
const PendingConsignorPayment = ({ data }) => {
  const router = useRouter();
  const [rowsData, setRowsData] = useState(data);
  const column = [
    '#',
    'LR No.',
    'Consignor',
    'Consignee',
    'Booking Date',
    'From',
    'To',
    'Vehicle No',
    'Vehicle Type',
    'Action',
  ];
  const rows = [];
  rowsData.map((item, i) => {
    const lr = item.lr_id;
    const bookingDate = dateFormat(item.booking_date, 'dd-mm-yyyy');
    rows.push([
      i + 1,
      lr,
      item.consignor_name,
      item.consignee_name,
      bookingDate,
      item.from_location,
      item.to_location,
      item.vehicle_no.toUpperCase(),
      item.ownership.toUpperCase(),
      <Button
        key={i}
        variant="outlined"
        size="small"
        color="success"
        onClick={() => router.push(`/account/pending-consignor-payment/${lr}`)}
      >
        Bilties
      </Button>,
    ]);
  });

  const totalPages = Math.ceil(rowsData / 10);

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.lr_id.toLowerCase().includes(searchValue.toLowerCase());
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(data);
  };

  return (
    <>


      <BreadCrumb />
      <Grid container style={{ marginBottom: 15 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            Pending Consignor Payment
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
      <TableComponent
        column={column}
        rows={rows}
        searchString={searchString}
        totalPages={totalPages}
        searchName={'Search Via Lr Number'}
      />
    </>
  );
};

export default PendingConsignorPayment;
export async function getServerSideProps(ctx) {
  // Fetch data from external API

  // get token from session
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    var data = [];
    try {
      const req = await fetch(
        `${process.env.apiUrl}/lr-bookings-status/unload`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
        }
      );
      var res = await req.json();

      if (res.status === 'success') {
        data = res.data;
      } else {
        data = [];
      }
    } catch (error) {
      data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
