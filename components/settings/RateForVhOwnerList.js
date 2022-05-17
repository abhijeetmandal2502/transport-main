import { DoubleArrow } from '@material-ui/icons';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';
import BtnNewBooking from '../buttons/NewBooking';
import TableComponent from '../TableComponent';
import { useState } from 'react';
import BackButton from '../buttons/BackButton';

const RateForVhOwnerList = (props) => {
  const { data } = props;

  const [rowsData, setRowsData] = useState(data);

  const column = [
    '#',
    'Consignor Name',
    'From Location ',
    'To Location ',
    'Distance',
    'Amount per KG',
    'Status',
  ];
  const rows = [];
  // pass id
  const EditButton = ({ id }) => {
    const slug = `edit-rate-for-owner-vehicle/${id}`;
    return (
      <Link href={slug}>
        <a>
          <Button className="newbookingbtn" variant="outlined" size="small">
            Edit
          </Button>
        </a>
      </Link>
    );
  };

  var i = 1;
  rowsData.map((item) => {
    var tempArr = item.consignor.split('_');
    var finalArr = tempArr.join(' ');


    rows.push([
      i + '.',
      // item.consignor,
      finalArr.toUpperCase(),
      item.from_location,
      item.to_location,
      item.distance,
      item.own_per_kg_rate,
      <EditButton id={item.slug} key={i} />,
    ]);
    i++;
  });
  var totalPage = Math.ceil(rowsData.length / 10);

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return (
        row.distance.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.per_kg_amount.toLowerCase().includes(searchValue.toLowerCase())
      );
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
      {' '}
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
              Rate master for vehicle owner
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              {/* <BtnNewBooking url={url} name={'Add Petrol Pump'} /> */}
              {/* <BackButton url=""/> */}
            </Box>
          </Grid>
        </Grid>

        <TableComponent
          rows={rows}
          column={column}
          searchString={searchString}
          totalPage={totalPage}
          searchName={'Search here...'}
        />
      </Container>
    </div>
  );
};

export default RateForVhOwnerList;
