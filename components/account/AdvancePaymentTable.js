import React, { useEffect, useState } from 'react';
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
  PaginationItem,
  Pagination,
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Search,
  ToggleOn,
} from '@material-ui/icons';
import Link from 'next/link';
import TableComponent from '../../components/TableComponent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSession, getSession } from 'next-auth/react';
import DataNotAvl from '../../components/DataNotAvl';
// pass id
const NAP = ({ id }) => {
  const slug = `/account/new-advance-payment/${id}`;
  return (
    <Link href={slug}>
      <a>
        <Button className="newbookingbtn" variant="outlined" size="small">
          Create Advance Payment
        </Button>
      </a>
    </Link>
  );
};

const AdvancePaymentTable = (props) => {
  const { cnDetails } = props;

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = React.useState(false);
  const [advPay, setAdvPay] = useState();
  const [bookingNo, setBookingNo] = useState();

  const handleClickOpen = async ({ id }) => {

    advPayDataFetch().then((value) => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // get token from session
  const { data: session } = useSession();
  const token = session.user.access_token;


  const advPayDataFetch = async (id) => {

    const result = await fetch(`${process.env.apiUrl}/advance-payments/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      // method: 'POST',
    });

    const advPayData = await result.json();

    setBookingNo(id);
    if (advPayData.status === 'success') {
      setAdvPay(advPayData);
    } else {
    }
  };

  const advPayArr = [
    { label: 'petrol 1', slug: '../receipt/payment-voucher-receipt' },
    { label: 'petrol 2', slug: '../receipt/quality-receipt' },
    { label: 'petrol 3', slug: '../receipt/consign-receipt' },
  ];

  // useEffect(() => {
  //   advPayDataFetch();
  // }, [])

  const ViewAdvPayBtn = ({ id }) => {
    return (
      <Box style={{ position: 'relative  !important' }}>
        <Button
          className="newbookingbtn"
          variant="outlined"
          size="small"
          aria-haspopup="true"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          // onClick={handleClick}
          onClick={() => {

            advPayDataFetch(id).then((value) => {

              setOpen(true);
            });
          }}
        // style={{ position: 'relative' }}
        >
          View Advance Payment
        </Button>
      </Box>
    );
  };

  const columns = [
    'Sl No',
    'LR No',
    // 'No Of Bilty',
    'Consignor Name',
    'Consignee Name',
    'From Location',
    'To Location',
    'Vehicle No',
    'Driver Name',
    'Driver Contact No',
    '  Add Bilty  ',
    ' View Bilty ',
  ];
  //   rows

  const [rowsData, setRowsData] = useState(cnDetails.data);
  const rows = [];

  var i = 1;
  if (rowsData !== null && rowsData !== undefined) {
    if (rowsData.length > 0) {
      rowsData.map((item) => {
        rows.push([
          i + '.',
          item.lr_id,
          // item.bilty_count,
          item.consignor_name,
          item.consignee_name,
          item.from_location,
          item.to_location,
          item.vehicle_no.toUpperCase(),
          item.driver_name,
          item.driver_mobile,
          <NAP id={item.lr_id} key={i} />,
          item.is_advance_done == 'no' ? (
            '-----'
          ) : (
            <ViewAdvPayBtn id={item.lr_id} key={i} />
          ),
        ]);
        i++;
      });
    }
  }
  //  end of rows

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return (
        row.vehicle_no.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.driver_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.consignor_name.includes(searchValue.toLowerCase())
      );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(cnDetails.data);
  };


  const qltySlug = `../receipt/quality-receipt/${bookingNo}`;
  const petrolVoucherSlug = `../receipt/payment-voucher-receipt-for-asset/${bookingNo}`;
  const advVoucherSlug = `../receipt/payment-voucher-receipt-for-amount/${bookingNo}`;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={5}>
      {cnDetails != undefined ? (
        <>
          {' '}
          <TableComponent
            rows={rows}
            column={columns}
            searchString={searchString}
            totalPage={5}
            searchName={'Search By Name'}
          />{' '}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ border: '1px solid #005780c2' }}
          >
            <DialogTitle style={{ fontWeight: 'bold', fontSize: 'large' }}>
              {advPay != undefined
                ? 'Choose to see advance payment'
                : 'No record found'}
            </DialogTitle>
            {advPay != undefined ? (
              <DialogContent>
                {advPay.data.petrol_pump_payments.items[0] != null &&
                  advPay.data.petrol_pump_payments.items[0] !== undefined ? (
                  //  '../receipt/payment-voucher-receipt'
                  <Link href={qltySlug}>
                    <Typography style={{ cursor: 'pointer', marginBottom: 10 }}>
                      Petrol Pump Slip
                    </Typography>
                  </Link>
                ) : null}
                {advPay.data.petrol_pump_payments.items[0] != null &&
                  advPay.data.petrol_pump_payments.items[0] !== undefined ? (
                  <Link href={petrolVoucherSlug}>
                    <Typography style={{ cursor: 'pointer', marginBottom: 10 }}>
                      Petrol Pump Voucher
                    </Typography>
                  </Link>
                ) : null}
                {advPay.data.advance_payment.items[0] != null &&
                  advPay.data.advance_payment.items[0] !== undefined ? (
                  <Link href={advVoucherSlug}>
                    <Typography style={{ cursor: 'pointer' }}>
                      Advance Payment Voucher
                    </Typography>
                  </Link>
                ) : null}
              </DialogContent>
            ) : (
              <div></div>
            )}
          </Dialog>
        </>
      ) : (
        <DataNotAvl />
      )}
    </Paper>
  );
};

export default AdvancePaymentTable;
