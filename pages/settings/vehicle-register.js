import React from 'react';
import useSWR from 'swr';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputLabel,
  Typography,
  Grid,
  Input,
} from '@mui/material';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import {
  Add,
  CheckBoxOutlineBlank,
  DoubleArrow,
  Home,
  HomeOutlined,
  Print,
  Search,
} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import Link from 'next/link';
import TableComponent from '../../components/TableComponent';
import BtnNewBooking from '../../components/buttons/NewBooking';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';
import UpdateButton from '../../components/buttons/UpdateButton';
import { useRouter } from 'next/router';

const VehicleRegister = ({ data }) => {
  const router = useRouter();

  console.log('checkrouter', router.query);
  const [rowsData, setRowsData] = useState(data);
  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.vehicle_no.toLowerCase().includes(searchValue.toLowerCase());
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(data);
  };

  const rows = [];

  var i = 1;
  rowsData.map((item) => {
    if (router.query.vhType == 'total') {
      rows.push([
        i,
        item.vehicle_no.toUpperCase(),
        item.type,
        item.ownership,
        item.vehicle_details,
        item.state,
        <UpdateButton
          url={`/edit/vehicle-update/${item.vehicle_no}`}
          key={i}
        />,
      ]);
      i++;
    } else if (item.ownership == router.query.vhType) {
      rows.push([
        i,
        item.vehicle_no.toUpperCase(),
        item.type,
        router.query.vhType,
        item.vehicle_details,
        item.state,
        <UpdateButton
          url={`/edit/vehicle-update/${item.vehicle_no}`}
          key={i}
        />,
      ]);
      i++;
    }
  });
  var totalPage = Math.ceil(data.length / 10);

  const url = '/settings/new-vehicle-register';

  const column = [
    '#',
    'Vehicle No.',
    'Vehicle Type',
    'Owner Ship Details',
    'Owner Name',
    'State',
    'Edit',
  ];
  return (
    <>
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <BreadCrumb />
      </Container>

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
              List of Vehicle Register
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              <BtnNewBooking url={url} name={'Add New Vehicle'} />
            </Box>
          </Grid>
        </Grid>

        {/* table component parts for showing table records */}

        <TableComponent
          column={column}
          rows={rows}
          searchString={searchString}
          totalPages={totalPage}
          searchName={'Search By Vehicle Number'}
        />
      </Container>
    </>
  );
};

export default VehicleRegister;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;
    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/vehicles`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    if (response.status === 'success') {
      var data = response.data;
    } else {
      var data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
