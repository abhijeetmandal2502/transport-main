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
import { consignRecTemArr } from './../receipt/ReceiptUtils';

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
        borderRadius: 4,
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
  createData(
    <div> {consignRecTemArr.dlvry_no}</div>,
    <div> {consignRecTemArr.lr_no}</div>
  ),
  createData(
    <div> {consignRecTemArr.arrivl_date}</div>,
    <div> {consignRecTemArr.transpoter}</div>
  ),
];

const ComponentToPrint = forwardRef((props, ref) => (
  <div ref={ref} style={{ width: '100%' }}>
    <Box style={{ padding: 20 }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}
        style={{
          height: 60,
        }}
      >
        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            borderTop: 'none',
            height: 30,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            style={{
              paddingLeft: 4,

              fontWeight: 'bold',
            }}
          >
            {consignRecTemArr.title}
          </Typography>
          <Typography
            variant="p"
            style={{
              paddingLeft: 4,
              // fontWeight: "bold",
              // textDecoration: "underline",
            }}
          >
            ({consignRecTemArr.sub_title})
          </Typography>
        </Box>
      </Box>
      <TableContainer
        style={{ overflowX: 'inherit' }}
        sx={{
          borderTop: '1px solid #767676',
          borderLeft: '1px solid #767676',
          borderRight: '1px solid #767676',
        }}
      >
        <Table aria-label="simple table">
          <TableHead id="invoiceTable" sx={{ height: 60 }}>
            <TableRow>
              <TableCell style={{ fontSize: 14, fontWeight: 'bold' }}>
                {consignRecTemArr.consign_name}
              </TableCell>
              <TableCell> {consignRecTemArr.con_rec_no}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="invoicetbody">
            {rows.map((row, key) => (
              <TableRow
                key={key}
              //  sx={{ '#invoicelasttd:last-child, #invoicelasttd:last-child': { borderTop: 1, } }}
              >
                <TableCell
                  style={{
                    width: '50%',
                    paddingTop: 10,
                    paddingLeft: 4,
                  }}
                >
                  {' '}
                  {row.Packages}
                </TableCell>
                <TableCell
                  style={{
                    width: '50%',
                    padding: '10 10 10 10',
                  }}
                  align="left"
                  fontSize="14"
                >
                  {row.Discription}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ border: '1px solid #767676', height: 25 }}>
        <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
          {consignRecTemArr.unlding_stck_rec}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}
        style={{
          height: 60,
          border: '1px solid #767676',

          borderTop: 'none !important',
        }}
      >
        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            borderTop: 'none',
            height: 30,
          }}
        >
          <Typography style={{ paddingLeft: 4, height: 30, fontSize: 11 }}>
            {consignRecTemArr.good_stck_recvd}{' '}
          </Typography>
        </Box>

        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            height: 30,
            margin: 'auto',
            borderLeft: '1px solid #767676'
          }}
        >
          <Typography style={{ paddingLeft: 4, fontSize: 11, height: 30 }}>
            {consignRecTemArr.disptch_truc_no}{' '}
          </Typography>
          <Typography
            style={{
              paddingLeft: 4,
              borderTop: '1px solid #767676',
              fontSize: 11,
              height: 30,
            }}
          >
            {consignRecTemArr.recevd_truc_no}{' '}
          </Typography>
        </Box>
      </Box>
      <Box
        style={{ border: '1px solid #767676', borderTop: 'none', height: 100 }}
      >
        <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
          {consignRecTemArr.remark}
        </Typography>
      </Box>
      <Box
        style={{ border: '1px solid #767676', borderTop: 'none', height: 30 }}
      >
        <Typography style={{ paddingLeft: 4, fontSize: 12 }}>
          TOTAL LOADED CASES:
        </Typography>
      </Box>
      <Box
        style={{ border: '1px solid #767676', borderTop: 'none', height: 30 }}
      >
        <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
          {consignRecTemArr.unlding_chrg_paid_rs}{' '}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}
        style={{
          height: 85,
          border: '1px solid #767676',

          borderTop: 'none',
        }}
      >
        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            borderTop: 'none',
            height: 30,
          }}
        >
          <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
            {consignRecTemArr.dept_in_chrg}{' '}
          </Typography>
          <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
            {consignRecTemArr.sign_stmp}{' '}
          </Typography>
        </Box>

        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            height: 30,
            borderLeft: '1px solid #767676'
          }}
        >
          <Typography style={{ paddingLeft: 4, fontSize: 11 }}>
            {consignRecTemArr.nam_sign_drivr}{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  </div>
));

const ConsignReceipt = () => {
  const componentRef = useRef();
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

      <ComponentToPrint ref={componentRef} />
    </div>
  );
};
export default ConsignReceipt;
