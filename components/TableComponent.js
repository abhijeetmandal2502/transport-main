import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Input,
  Divider,
  Stack,
  Pagination,
} from '@mui/material';
import { Box } from '@mui/material';
import {
  AccountCircle,
  Edit,
  Search,
  SearchRounded,
  ToggleOn,
} from '@material-ui/icons';
import { capitalize } from '@material-ui/core';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { keys } from '@mui/system';

const TableComponent = (props) => {
  const { rows, column, searchName, searchString, totalPages } = props;
  const [search, setSearch] = useState('');

  const columns = [];

  for (var key in column) {
    columns.push({ id: key, label: column[key] });
  }
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const rowsPerPage = 10;
  const handleChange = (event, value) => {
    setPage(value);
    setPerPage(value - 1);
  };

  const rowsData = rows;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={5}>
      <Grid container spacing={2}>
        <Grid item style={{ margin: 10 }}>
          {/* search bar here */}
          {searchName === '' ? null : <TextField
            style={{ paddingRight: 10 }}
            id="input-with-icon-textfield"
            label={searchName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
            onChange={(e) => searchString(e.target.value)}
            variant="standard"
          />}

        </Grid>
      </Grid>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item, key) => (
                <TableCell
                  key={key}
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
            {

              rowsData.length > 0 ? (rowsData
                .slice(perPage * rowsPerPage, perPage * rowsPerPage + rowsPerPage)
                .map((row, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={key} >
                      {columns.map((column, i) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            sx={{ padding: '8px' }}
                            style={{
                              border: '1px solid lightgray',
                            }}
                            align={'center'}
                            // {column.align}
                            key={i}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })) : <TableRow ><TableCell colSpan={6} >Data Not Available</TableCell></TableRow>

            }
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
  );
};

export default TableComponent;
