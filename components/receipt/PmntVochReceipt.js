// import { AspectRatio, Lock } from "@material-ui/icons";
import {
  Box,
  Divider,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// import { fontWeight } from "@mui/system";
import React, { forwardRef, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';
import { pmtVoucherTempArr } from './ReceiptUtils';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';

function Item(props) {
  const { sx, ...other } = props;



  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid #767676',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function createData(Packages, Discription) {
  return { Packages, Discription };
}

const rows = [
  createData('', 'Rs.'),

];

const ComponentToPrint = forwardRef((props, ref) => (
  <div ref={ref} style={{ width: '100%' }}>
    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
    >
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 7' }}
        style={{ border: 'none', width: ' 100%' }}
      >
        <Box>
          <Typography
            variant="h5"
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {pmtVoucherTempArr.title}{' '}
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
            }}
          >
            ({pmtVoucherTempArr.sub_title})
          </Typography>
        </Box>
      </Item>
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 3' }}
        style={{
          width: '100%',
          border: 'none',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            sx={{ textAlign: 'end' }}
            style={{ fontSize: '12px', marginTop: 6 }}
          >
            {' '}
            Date.
          </Typography>
          <FormGroup
            style={{
              alignItems: 'end',
              width: 'auto',
              marginBottom: 5,
            }}
          >
            <Input
              sx={{ width: '95%' }}
              style={{ fontSize: '12px' }}
              value={dayjs(props.receipt.created_at, 'YYYY-MM-DD+h:mm').format(
                'YYYY-MM-DD'
              )}
            />
          </FormGroup>
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            sx={{ textAlign: 'end' }}
            style={{
              fontSize: '12px',
              marginTop: 6,
              width: 'maxContent',
            }}
          >
            {pmtVoucherTempArr.cn_number}
          </Typography>
          <FormGroup
            style={{
              alignItems: 'end',
              marginBottom: 5,
            }}
          >
            <Input
              sx={{ width: '95%' }}
              style={{ fontSize: '12px' }}
              value={props.lrNo}
            />
          </FormGroup>
        </Box>
      </Item>
    </Box>

    <Box>
      <TableContainer
        style={{ overflowX: 'inherit', padding: '' }}
        sx={{ border: '1px solid #767676' }}
      >
        <Table
          aria-label="simple table"
          sx={{ borderRight: '1px solid #767676' }}
        >
          <TableHead id="invoiceTable">
            <TableRow style={{ paddingTop: 10 }}> </TableRow>
          </TableHead>
          <TableBody id="invoicetbody">
            {rows.map((row) => (
              <TableRow
                key={row.Packages}
              //  sx={{ '#invoicelasttd:last-child, #invoicelasttd:last-child': { borderTop: 1, } }}
              >
                <TableCell
                  style={{
                    width: '85%',
                    paddingTop: 10,
                  }}
                >
                  {' '}
                  {row.Packages}
                </TableCell>
                <TableCell
                  style={{
                    width: '15%',
                    padding: '10 10 10 10',
                  }}
                  align="left"
                >
                  {row.Discription}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
    >
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 3' }}
        style={{
          width: '100%',
          border: 'none',
          margin: 'auto',
        }}
      >
        <Box
          style={{
            display: 'flex',
            margin: 'auto',
          }}
        >
          <Typography
            style={{ fontSize: '12px', marginBottom: 6, width: '100%' }}
          >
            {pmtVoucherTempArr.psd_by}
          </Typography>
        </Box>
      </Item>
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 3' }}
        style={{
          width: '100%',
          border: 'none',
          margin: 'auto',
        }}
      >
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Typography
            style={{ fontSize: '12px', marginBottom: 6, width: '100%' }}
          >
            {pmtVoucherTempArr.crctfyd_by}
          </Typography>
        </Box>
      </Item>
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 3' }}
        style={{
          width: '100%',
          border: 'none',
          margin: 'auto',
        }}
      >
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Typography
            style={{ fontSize: '12px', marginBottom: 6, width: '100%' }}
          >
            {pmtVoucherTempArr.payees_signature}
          </Typography>
        </Box>
      </Item>
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 2' }}
        style={{
          padding: 0,
          width: '100%',
          border: 'none',
        }}
      >
        <Box
          style={{
            display: 'flex',
            border: '1px solid #767676',
            height: 120,
            width: 112,
            marginRight: 'inherit',
            textAlign: 'auto',
            marginLeft: 15,
          }}
        >
          <Typography
            style={{ textAlign: 'center', width: '100%', margin: 'auto' }}
          >
            Stamp
          </Typography>
        </Box>
      </Item>
    </Box>
  </div>
));
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const PmntVochReceipt = () => {
  const componentRef = useRef();
  const router = useRouter()

  const [recptData, setRecptData] = React.useState();



  const { data, error } = useSWR(
    `${process.env.apiUrl}/advance-payments/${router.query.id}`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (data) {

    if (router.pathname == `/receipt/payment-voucher-receipt-for-asset/:`) {
      const receipt = data.data.petrol_pump_payments.items[0];
    } else if (
      router.pathname == `/receipt/payment-voucher-receipt-for-amount/:id]}`
    ) {
      const receipt = data.data.petrol_pump_payments.items[0];
    }
  }

  // if () {
  // data && setRecptData(data.data);
  // 
  ComponentToPrint.displayName = 'ComponentToPrint';
  return (
    <div style={{ width: '842px', margin: 'auto' }}>
      <style jsx>{`
        @media print {
          @page {
            size: a4;
          }
        }
      `}</style>

      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />

      {/* {receipt && (
        <ComponentToPrint
          ref={componentRef}
          receipt={receipt}
          lrNo={router.query.id}
        />
      )} */}
    </div>
  );
};
export default PmntVochReceipt;
