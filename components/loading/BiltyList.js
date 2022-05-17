import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  Add,
  ArrowLeft,
  ArrowRight,
  DoubleArrow,
  Search,
} from '@material-ui/icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BackButton from '../buttons/BackButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Input, Pagination, PaginationItem, Stack } from '@mui/material';
import BreadCrumb from '../BreadCrumb';
import { useRouter } from 'next/router';
import TableComponent from '../TableComponent';
import { textAlign } from '@mui/system';
import DataNotAvl from '../DataNotAvl';
import dayjs from 'dayjs';

const BiltyList = (props) => {
  const { lrId, biltyData } = props;
  // const finalData = [];

  const columns = [
    'Sr. No.',
    'No of Packages',
    'Description',
    'Invoice Number',
    'Gstin Number',
    'Goods Value',
    'Weight',
    'Created At',
    'Created By',
  ];

  // const finalData = await biltyData.json();
  const [rowsData, setRowsData] = useState(biltyData);
  useEffect(() => {
    if (biltyData != undefined) {
      setRowsData(biltyData);
    }
  }, [biltyData]);
  const rows = [];
  var i = 1;
  if (rowsData !== null && rowsData !== undefined) {
    if (rowsData.length > 0) {

      rowsData.map((item) => {

        rows.push([
          i,
          item.packages,
          item.description,
          item.invoice_no,
          item.gst_no,
          item.goods_value,
          item.weight,

          dayjs(item.created_at, 'YYYY-MM-DD+h:mm').format('YYYY-MM-DD'),
          item.created_by,

          // item.No_of_Pack,
          // item.No_of_Pack,
          // item.No_of_Pack,
        ]);
        i++;
      });
    }
  }

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.invoice_no
        .toLowerCase()
        .includes(
          searchValue.toLowerCase() ||
          row.gst_no.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(biltyData);
  };
  const router = useRouter();

  return (
    <div>
      <Grid
        container
        style={{
          marginBottom: { sx: 4, md: 15 },
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          style={{
            marginBottom: 4,
            display: 'flex',
          }}
        >
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            Bilty List
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
            <a>
              <BackButton url={'/loading/bilty-generate'} passHref />
            </a>
          </Box>
        </Grid>
      </Grid>

      <Paper
        sx={{ width: '100%', overflow: 'hidden' }}
        style={{ marginTop: 20 }}
        elevation={5}
      >
        <Grid container spacing={2}>

        </Grid>
        <Typography
          variant="h6"
          component="h4"
          sx={{ fontWeight: 'bold' }}
          style={{ margin: 15 }}
        >
          CN No: {props.id}
        </Typography>
        <TableComponent
          rows={rows}
          column={columns}
          searchString={searchString}
          totalPage={5}
          searchName={'Search By Name'}
        />
      </Paper>
    </div>
  );
};

export default BiltyList;
