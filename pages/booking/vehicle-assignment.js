import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import DataGridComponent from '../../components/DataGridComponent';

const VehicleAssignment = ({ data }) => {
  const [rowsData, setRowsData] = useState(data);

  useEffect(() => {
    setRowsData(data);
  }, [data]);

  const rows = [];

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'cn',
      headerName: 'LR No.',
      width: 150,
      editable: true,
    },
    {
      field: 'consignee',
      headerName: 'Consignee',
      width: 300,
      editable: true,
    },
    {
      field: 'consignor',
      headerName: 'Consignor',
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
      field: 'redirect',
      headerName: 'Action',
      width: 110,
      editable: true,
      renderCell: (params, i) => {
        var slug = params.row.cn;
        return (
          <Link href={`/booking/vehicle-assignment/${slug}`}>
            <Button
              variant="contained"
              size="small"
              style={{ fontSize: '9px', fontWeight: 700 }}
            >
              Vehicle Assign
            </Button>
          </Link>
        );
      },
    },
  ];

  var i = 1;
  rowsData.map((item) => {
    rows.push({
      id: i + '.',
      cn: item.lr_id,
      consignor: item.consignor_name,
      consignee: item.consignee_name,
      from: item.from_location,
      to: item.to_location,
      redirect: '',
    });
    i++;
  });

  return (
    <Box>
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
              List of Vehicle Assignment
            </Typography>
          </Grid>
        </Grid>

        <DataGridComponent columns={columns} rows={rows} />
      </Container>
    </Box>
  );
};

export default VehicleAssignment;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/lr-bookings-status/fresh`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    var data = [];
    if (response.status == 'success') {
      data = response.data;
    } else {
      data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
