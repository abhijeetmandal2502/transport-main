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
  TextField,
  FormControl,
  InputAdornment,
  Divider,
  PaginationItem,
  Pagination,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import {
  AccountCircle,
  Add,
  ArrowLeft,
  ArrowRight,
  CheckBoxOutlineBlank,
  DoubleArrow,
  Home,
  HomeOutlined,
  Print,
  Search,
} from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import Link from 'next/link';
import SearchComponent from './SearchComponent';
import { capitalize } from '@material-ui/core';
import BtnNewBooking from '../buttons/NewBooking';
import UpdateButton from '../buttons/UpdateButton';
import { useRouter } from 'next/router';
import dateFormat, { masks } from 'dateformat';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const CNBooking = (props) => {
  const { rows, setSlug } = props;

  const [filteredRows, setFilteredRows] = useState(rows);
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(1);
  const finalRows = [];

  let componentToShow;
  const finalColumns = [
    { field: 'id', headerName: '#' },
    {
      field: 'lr_no',
      headerName: 'Cn No',
      width: 200,
      editable: true,
    },
    {
      field: 'consignor',
      headerName: 'Consignor ',
      width: 300,
      editable: true,
    },
    {
      field: 'consignee',
      headerName: 'Consignee ',
      width: 300,
      editable: true,
    },
    {
      field: 'from_location',
      headerName: 'From',
      width: 150,
      editable: true,
    },
    {
      field: 'to_location',
      headerName: 'To',
      width: 150,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: '100',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: '300',
      editable: true,
      renderCell: (params) => {
        const index = params.id - 1;

        let slug;
        let title;
        switch (finalRows[index].status) {
          case 'fresh':
            title = 'Vehicle Assign';
            slug = '/booking/vehicle-assignment';
            break;
          case 'vehicle-assign':
            title = 'Generate New Bilty';
            slug = `/loading/generated-new-bilty/${finalRows[index].lr_no}`;
            break;
          case 'loading':
            title = 'Unload Vehicle';
            slug = `/account/unload-vehicle/${finalRows[index].lr_no}`;
            break;
          case 'unload':
            title = 'LR Booking';
            slug = '/booking/lr-booking';
            break;
          case 'closed':
            title = 'Close';
            slug = '/';
            break;

          default:
            break;
        }

        if (finalRows[index].status.toLowerCase() == 'loading') {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/loading/generated-bilty">
                <Button
                  variant="contained"
                  size="small"
                  // startIcon={<EditIcon />}
                  color="secondary"
                  sx={{ marginRight: '20px' }}
                >
                  Print Bilty
                </Button>
              </Link>

              <Link href={`/account/unload-vehicle/${finalRows[index].lr_no}`}>
                <Button
                  variant="contained"
                  size="small"
                  // startIcon={<EditIcon />}
                  color="secondary"
                >
                  Unload Vehicle
                </Button>
              </Link>
            </Box>
          );
        } else {
          return (
            <Link href={slug}>
              <Button
                variant="contained"
                size="small"
                // startIcon={<EditIcon />}
                color="secondary"
              >
                {title}
              </Button>
            </Link>
          );
        }
      },
    },

    //  status != 'cancel' ? <UpdateButton url={`/edit/edit-lr/${cnNumber}`} key={i} /> : ''
    {
      field: 'action',
      headerName: 'Action',
      width: '150',
      editable: true,
      renderCell: (params) => {
        const index = params.id - 1;
        return finalRows[index].status != 'cancel' ? (
          <UpdateButton
            url={`/edit/edit-lr/${finalRows[index].lr_no}`}
            // key={i}
          />
        ) : (
          ''
        );
      },
    },
  ];

  rows.map((item, i) => {
    // const bookingDate = dateFormat(item.booking_date, 'dd/mm/yyyy');
    finalRows.push({
      id: i + 1,
      lr_no: item.lr_id,
      consignor: item.consignor_name,
      consignee: item.consignee_name,
      from_location: item.from_location,
      to_location: item.to_location,
      amount: item.amount,
      status: item.status,
      action: (
        <Button
          variant="contained"
          size="small"
          startIcon={<EditIcon />}
          color="secondary"
        >
          ok
        </Button>
      ),
      // butonText(item.status),
    });
  });
  // console.log('ch3ckmapitem', finalRows);

  useEffect(() => {
    // setFilteredRows(rows);
  }, [rows]);

  const columns = [];

  const rowsData = [];

  var icon = '';

  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <BtnNewBooking
                name={'New Booking'}
                url={'/booking/new-booking'}
              />
            </Box>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={5}>
          {finalRows.length > 0 ? (
            <div style={{ height: '550px', width: '100%' }}>
              <DataGrid
                rows={finalRows}
                columns={finalColumns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                // checkboxSelection
                onSelectionModelChange={(ids) => {
                  // setChecked(ids);
                }}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          ) : (
            <div></div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default CNBooking;
