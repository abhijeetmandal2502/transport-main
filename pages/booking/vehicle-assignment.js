import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
const VehicleAssignment = ({ data }) => {
  const [rowsData, setRowsData] = useState(data);

  useEffect(() => {
    setRowsData(data);
  }, [data]);

  // find needed data from rowsData


  const rows = [];
  var i = 1;
  rowsData.map((item) => {
    rows.push([
      i + '.',
      item.lr_id,
      item.consignor_name,
      item.consignee_name,
      item.from_location,
      item.to_location,
      assignButton(item.lr_id),
    ]);
    i++;
  });
  const totalPages = Math.ceil(rows.length / 10);

  const column = [
    '#',
    'CN No.',
    'consignor',
    'Consignee',
    'From',
    'To',
    'Action',
  ];

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

        <TableComponent
          rows={rows}
          column={column}
          totalPages={totalPages}
          searchName={'Search Via Lr Number'}
          searchString={searchString}
        />
      </Container>
    </>
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

const assignButton = (slug) => {
  return (
    <Link href={`/booking/vehicle-assignment/${slug}`}>
      <Button variant="outlined">Vehicle Assign</Button>
    </Link>
  );
};
