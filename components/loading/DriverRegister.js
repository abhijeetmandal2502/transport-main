import { Typography } from '@material-ui/core';
import { DoubleArrow } from '@material-ui/icons';
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import UpdateButton from '../buttons/UpdateButton';
import React from 'react';
import BtnNewBooking from '../buttons/NewBooking';
import TableComponent from '../TableComponent';
import { useState } from 'react';

const DriverRegister = (props) => {
  const { data } = props;

  const [rowsData, setRowsData] = useState(data);

  const column = [
    '#',
    'Name',
    'DL No.',
    'DL Expiry',
    'Mobile',
    'Address',
    'City',
    'State',
    'Status',
    'Edit'
  ];

  // 
  var i = 1;
  const rows = [];
  rowsData.map((item) => {
    rows.push([
      i + '.',
      item.name,
      item.DL_no,
      item.DL_expire,
      item.mobile,
      item.address,
      item.city,
      item.state,
      item.status,
      <UpdateButton url={`/edit/driver-details/${item.driver_id}`} key={i} />
    ]);
    i++;
  });
  var totalPage = Math.ceil(rowsData.length / 10);

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(data);
  };

  const url = '/loading/new-driver';
  return (
    <div>
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid
          container
          style={{
            marginBottom: { sx: 4, md: 15 },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              List Of Drivers
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
              <BtnNewBooking url={url} name={'Add New Driver'} />
            </Box>
          </Grid>
        </Grid>
        <TableComponent
          rows={rows}
          column={column}
          searchString={searchString}
          totalPage={totalPage}
          searchName={'Search By Name'}
        />
      </Container>
    </div>
  );
};

export default DriverRegister;
