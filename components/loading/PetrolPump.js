import { DoubleArrow } from '@material-ui/icons';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import BtnNewBooking from '../buttons/NewBooking';
import TableComponent from '../TableComponent';
import { useState } from 'react';
import UpdateButton from '../buttons/UpdateButton';

const PetrolPump = (props) => {
  const { data } = props;

  const [rowsData, setRowsData] = useState(data);

  const column = [
    '#',
    'Pump Name',
    'Mobile',
    'Address',
    'City',
    'State',
    'Status',
    'Edit'
  ];
  const rows = [];

  var i = 1;
  rowsData.map((item) => {
    rows.push([
      i + '.',
      item.pump_name,
      item.mobile,
      item.address,
      item.city,
      item.state,
      item.status,
      <UpdateButton url={`/edit/petrol-pump/${item.pump_id}`} key={i} />
    ]);
    i++;
  });
  var totalPage = Math.ceil(rowsData.length / 10);

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.pump_name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(data);
  };

  const url = '/loading/add-new-petrol-pump';
  return (
    <div>
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
              Petrol Pump List
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              <BtnNewBooking url={url} name={'Add Petrol Pump'} />
            </Box>
          </Grid>
        </Grid>

        <TableComponent
          rows={rows}
          column={column}
          searchString={searchString}
          totalPage={totalPage}
          searchName={'Search By Pump Name'}
        />
      </Container>
    </div>
  );
};

export default PetrolPump;
