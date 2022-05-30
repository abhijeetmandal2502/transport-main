import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
// import DataGridComponent from '../../components/DataGridComponent';
import DataGridComponent from '../../components/DataGridComponent';
import Link from 'next/link'

const BiltyGenerate = ({ biltyData }) => {

  console.log("bilty data :", biltyData)

  const rows = [];

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
      field: 'consignor',
      headerName: 'Consignor',
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
      headerName: 'Vehicle No',
      width: 110,
      editable: true,
    },
    {
      field: 'driver',
      headerName: 'Driver',
      width: 110,
      editable: true,
    },
    {
      field: 'driverMobile',
      headerName: 'Driver Mobile',
      width: 110,
      editable: true,
    },
    {
      field: 'genBilty',
      headerName: 'Bilty Gen',
      width: 110,
      editable: true,
      renderCell: (params, i) => {
        var slug = params.row.cn;
        // console.log("params", params)
        return (
          <Link href={`/loading/generate-new-bilty/${slug}`}  >
            <Button variant="contained" size="small" style={{ fontSize: '9px', fontWeight: 700 }}>
              Gen Bilty
            </Button>
          </Link>

        );
      }
    },
    {
      field: 'viewBilty',
      headerName: 'View Bilties',
      width: 110,
      editable: true,
      renderCell: (params, i) => {
        var slug = params.row.cn;
        // console.log("params", params)
        return (
          <Link href={`/loading/view-bilty/${slug}`}  >
            <Button variant="contained" size="small" style={{ fontSize: '9px', fontWeight: 700 }}>
              View Bilties
            </Button>
          </Link>

        );
      }
    },
  ];

  var i = 1;
  biltyData.map((val) => {
    rows.push({
      id: i,
      cn: val.lr_id,
      consignor: val.consignor_name,
      consignee: val.consignee_name,
      from: val.from_location,
      to: val.to_location,
      vehicleNo: val.vehicle_no.toUpperCase(),
      driver: val.driver_name,
      driverMobile: val.driver_mobile,
      genBilty: '',
      viewBilty: ''
    })
    i++;
  })


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

        <DataGridComponent columns={columns} rows={rows} />

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
      var biltyData = biltyRes.data;
    } else {
      var biltyData = [];
    }
  } else {
    var biltyData = [];
  }
  // Pass data to the page via props
  return { props: { biltyData } };
}
