import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

  Typography,
  Grid,

  Divider,

  Pagination,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import {

  Print,

} from '@material-ui/icons';

import SearchComponent from './SearchComponent';

import BtnNewBooking from '../buttons/NewBooking';
import UpdateButton from '../buttons/UpdateButton';


const CNBooking = (props) => {
  const { column, rows, setSlug, searchData, totalPages } = props;

  const [filteredRows, setFilteredRows] = useState(rows);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const columns = [];

  for (var key in column) {
    columns.push({ id: key, label: column[key] });
  }

  const rowsData = [];

  var i = (page * 10 - 10) > 0 ? (page * 10 - 10 + 1) : 1;
  // alert(page)

  var icon = '';
  filteredRows.map((item) => {
    const cnNumber = item.lr_id;
    const consignor = item.consignor_name;
    const consignee = item.consignee_name;
    const from = item.from_location;
    const to = item.to_location;
    const amount = item.amount;
    const status = item.status;
    const print = item.print;
    if (print === 'yes') {
      icon = <Print />;
    } else {
      icon = 'NA';
    }

    rowsData.push([
      i + '.',
      cnNumber,
      consignor,
      consignee,
      from,
      to,
      amount,
      status,
      status != 'cancel' ? <UpdateButton url={`/edit/edit-lr/${cnNumber}`} key={i} /> : ''

    ]);

    i++;
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {


    searchData({ key: newPage, type: 'pagination' });
    setSlug(`/${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchString = (searchValue) => {
    const filteredRows = rows.filter((row) => {
      return row.lr_id.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredRows(filteredRows);
  };

  const searchCN = (cn) => {
    searchData(cn);
  };
  function handleChange(event, value) {
    setPage(value);
    searchData({ key: value, type: 'pagination' });
  }

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
              Booking List
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >

              <BtnNewBooking name={'New Booking'} url={'/booking/new-booking'} />
            </Box>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={5}>
          <Grid container spacing={2}>
            <Grid item style={{ margin: 10 }}>
              {/* search component */}

              <SearchComponent
                text={'Search CN Number'}
                searchString={searchString}
                searchCN={searchCN}
              />
            </Grid>
          </Grid>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item, key) => (
                    <TableCell
                      key={key}
                      align={item.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: 'bold',
                        paddingLeft: 10,
                        textAlign: 'center',
                        paddingRight: 10,
                        border: '1px solid lightgray',
                      }}
                    >
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsData
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, key) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={key}
                      >
                        {columns.map((column, key) => {
                          const value = row[column.id];
                          // 
                          return (
                            <TableCell
                              style={{ border: '1px solid lightgray' }}
                              key={key}
                              align={column.align}

                            >
                              {(column.format && typeof value === 'number')
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider style={{ marginBottom: 15 }} />
          {/* pagination */}
          <Stack spacing={2} style={{ marginBottom: 15 }}>
            <Pagination
              style={{
                display: 'flex',
                justifyContent: 'end',
                flexWrap: 'wrap',
              }}
              color="primary"
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default CNBooking;
