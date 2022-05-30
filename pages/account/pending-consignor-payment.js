import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/router';
import DataGridComponent from '../../components/DataGridComponent';
const PendingConsignorPayment = ({ data }) => {
  const router = useRouter();
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 60,
    },
    {
      field: 'cn',
      headerName: 'LR No.',
      width: 150,
      editable: true,
    },
    {
      field: 'bookingDate',
      headerName: 'Booking Date',
      width: 150,
    },
    {
      field: 'consignor',
      headerName: 'consignor',
      width: 300,
      editable: true,
    },
    {
      field: 'consignee',
      headerName: 'Consignee',
      width: 300,
      editable: true,
    },
    {
      field: 'from',
      headerName: 'From',
      width: 110,
      editable: true,
    },
    {
      field: 'to',
      headerName: 'To',
      width: 110,
      editable: true,
    },
    {
      field: 'vehicleNo',
      headerName: 'vehicle No',
      width: 110,
      editable: true,
    },
    {
      field: 'vehicleType',
      headerName: 'Vehicle Type',
      width: 110,
      editable: true,
    },
    {
      field: 'redirect',
      headerName: 'Action',
      width: 110,
      editable: true,
      renderCell: (params, i) => {
        var slug = params.row.cn;
        return (
          <Link href={`/account/pending-consignor-payment/${slug}`}  >
            <Button variant="contained" size="small" style={{ fontSize: '9px', fontWeight: 700 }}>
              Bilties
            </Button>
          </Link>
        );
      }
    },
  ];

  const rows = [];
  data.map((item, i) => {
    const lr = item.lr_id;
    const bookingDate = dateFormat(item.booking_date, 'dd-mm-yyyy');
    rows.push({
      id: i + 1,
      cn: lr,
      consignor: item.consignor_name,
      consignee: item.consignee_name,
      bookingDate: bookingDate,
      from: item.from_location,
      to: item.to_location,
      vehicleNo: item.vehicle_no.toUpperCase(),
      vehicleType: item.ownership.toUpperCase(),
      redirect: <Button
        key={i}
        variant="outlined"
        size="small"
        color="success"
        onClick={() => router.push(`/account/pending-consignor-payment/${lr}`)}
      >
        Bilties
      </Button>,
    });
  });


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
      <DataGridComponent columns={columns} rows={rows} />
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
