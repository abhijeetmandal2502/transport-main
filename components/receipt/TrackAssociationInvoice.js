import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { forwardRef, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';
import { consignRecTemArr } from '../../components/ReceiptUtils';
import { fontWeight, textAlign } from '@mui/system';
import { ToWords } from 'to-words';
import { biltyInvoiceData } from '../../components/Utils'

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

const toWords = new ToWords();

const ComponentToPrint = forwardRef(({ props }, ref) => (
  <div ref={ref} style={{ width: '100%', margin: 'auto' }}>
    <Box style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Box
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
            borderTop: 'none',
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
            TRUCK ASSOCIATION
          </Typography>
          <Typography
            style={{
              paddingLeft: 4,
              textDecoration: 'underline',
              fontSize: 11,
            }}
          >
            FEEL OWNERS & TRANSPORT CONTRACTORS
          </Typography>
          <Typography
            variant="p"
            style={{
              paddingLeft: 2,
              fontSize: 11,
              fontWeight: 'bold',
            }}
          >
            VILL, KALYANPUR SIDCUL ROAD SITARGANJ UDHAM SINGH NAGAR (U.K)
          </Typography>
          <Box>
            <Typography
              variant="p"
              style={{
                paddingLeft: 2,
                fontSize: 11,
                fontWeight: 'bold',
              }}
            >
              ( GSTIN - {biltyInvoiceData.gst})
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container sx={{ border: '1px solid #767676' }}>
        {/* 1ST ROW */}

        <Grid item xs={10} sx={{ borderBottom: '1px solid #767676' }}>
          <Box style={{ padding: '3px', display: 'flex' }}>
            <Grid container spacing={4}>
              <Grid
                item
                xs={2}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>BILL NO.</Box>
              </Grid>
              <Grid item xs={10} style={{ fontSize: '12px' }}>
                <Box>{props.bilty.bill_no}</Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ borderBottom: '1px solid #767676', fontSize: '12px' }}
        >
          <Box>

            <Typography style={{ padding: '3px', fontSize: '12px' }}>
              {/* there need to add custom date sended by usr */}
              DATE - {props.bilty.receipt_date}
            </Typography>
          </Box>
        </Grid>

        {/* 2ND ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderBottom: '1px solid #767676',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>Vehicle No.</Box>
              </Grid>
              <Grid item xs={9} style={{ fontSize: '12px' }}>
                <Box>{props.vehicle_no.toUpperCase()}</Box>
              </Grid>
            </Grid>

          </Box>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderBottom: '1px solid #767676',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>Shipment No.</Box>
              </Grid>
              <Grid item xs={9} style={{ fontSize: '12px' }}>
                <Box>{props.shipment_no.toUpperCase()}</Box>
              </Grid>
            </Grid>

          </Box>

          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderBottom: '1px solid #767676',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>L.R. No.</Box>
              </Grid>
              <Grid item xs={9} style={{ fontSize: '12px' }}>
                <Box>{props.lr_id}</Box>
              </Grid>
            </Grid>

          </Box>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderBottom: '1px solid #767676',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>L.R. Date.</Box>
              </Grid>
              <Grid item xs={9} style={{ fontSize: '12px' }}>
                <Box>{props.lr_date}</Box>
              </Grid>
            </Grid>
          </Box>
          <Box style={{ paddingLeft: '3px', display: 'flex' }}>
            <Typography style={{ fontSize: '12px' }}>Dear Sir,</Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{ fontSize: '12px', borderRight: '1px solid #767676' }}
              >
                <Box style={{ padding: '3px' }}>To</Box>
                <Box style={{ padding: '3px' }}>{props.consignor_name}</Box>
                <Box style={{ padding: '3px' }}>{props.consignor_address}</Box>
                <Box style={{ padding: '3px' }}>
                  GSTIN -{props.consignor_gst_no}{' '}
                </Box>
              </Grid>
              <Grid item xs={5}></Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 3RD ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>
              Please Pay by demand draft A/C payee Cheque only,
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
        </Grid>
        {/* 4th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>
              {/* Amount debited towards Transportation of material from */}
              A/C NO. 5923169654615
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                }}
              >
                <Box style={{ padding: '3px', fontWeight: 'bold' }}>
                  Total Freight
                </Box>
              </Grid>
              <Grid item xs={5} style={{ fontSize: '12px', padding: '3px' }}>
                <Box style={{ padding: '3px', textAlign: 'end' }}>
                  {' '}
                  ₹{props.bilty.process_amount}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 5th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              paddingLeft: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>
              {/* RUDRAPUR TO HASANGARH */}
              IFSC CODE- UTIB0000507
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                  height: '22px',
                }}
              ></Grid>
              <Grid
                item
                xs={5}
                style={{ fontSize: '12px', padding: '3px', height: '22px' }}
              ></Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 6th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
              height: '22px',
            }}
          >
            {' '}
            <Typography style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {/* RUDRAPUR TO HASANGARH */}
              {`${props.consignor_location.toUpperCase()} TO ${props.consignee_location.toUpperCase()}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                  height: '22px',
                }}
              ></Grid>
              <Grid
                item
                xs={5}
                style={{ fontSize: '12px', padding: '3px', height: '22px' }}
              ></Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 7th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                <Box>Weight :</Box>
              </Grid>
              <Grid item xs={9} style={{ fontSize: '12px' }}>
                <Box>
                  {props.bilty.weight} {props.bilty.weight_unit.toUpperCase()}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                  height: '22px',
                }}
              ></Grid>
              <Grid
                item
                xs={5}
                style={{ fontSize: '12px', padding: '3px', height: '22px' }}
              ></Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 8th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
              height: '22px',
            }}
          ></Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                }}
              >
                <Box style={{ padding: '3px', fontWeight: 'bold' }}>
                  Total Rs.
                </Box>
              </Grid>
              <Grid item xs={5} style={{ fontSize: '12px', padding: '3px' }}>
                <Box style={{ padding: '3px', textAlign: 'end' }}>
                  ₹ {props.bilty.process_amount}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 9th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
              height: '22px',
            }}
          ></Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                }}
              >
                <Box style={{ padding: '3px', fontWeight: 'bold' }}>Extra</Box>
              </Grid>
              <Grid item xs={5} style={{ fontSize: '12px', padding: '3px' }}>
                <Box style={{ height: '22px' }}></Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 10th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>
              In words- {toWords.convert(props.bilty.process_amount)} Rupees
              Only
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ borderTop: '1px solid #767676' }}>
            <Grid container>
              <Grid
                item
                xs={7}
                style={{
                  fontSize: '12px',
                  borderRight: '1px solid #767676',
                  padding: '3px',
                }}
              >
                <Box style={{ padding: '3px', fontWeight: 'bold' }}>Total.</Box>
              </Grid>
              <Grid item xs={5} style={{ fontSize: '12px', padding: '3px' }}>
                <Box style={{ padding: '3px', textAlign: 'end' }}>
                  {' '}
                  ₹ {props.bilty.process_amount}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* 11th ROW */}
        <Grid
          item
          xs={7}
          sx={{
            borderRight: '1px solid #767676',
            borderTop: '1px solid #767676',
          }}
        >
          <Box style={{ padding: '3px', display: 'flex' }}>
            <Typography style={{ fontSize: '12px' }}>
              ENCL : Proper acknowledgement with the bill.
            </Typography>
          </Box>
          <Box style={{ height: '22px', borderTop: '1px solid #767676' }}></Box>
          <Box
            style={{
              padding: '3px',
              display: 'flex',
              borderTop: '1px solid #767676',
            }}
          >
            <Typography style={{ fontSize: '12px' }}>E. & O.</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderTop: '1px solid #767676', padding: '5px' }}
        >
          <Box style={{ fontSize: '12px', fontWeight: 'bold' }}>
            FOR TRUCK ASSOCIATION
          </Box>
        </Grid>

        {/* 12th ROW */}
        <Grid item xs={7} sx={{ borderRight: '1px solid #767676' }}>
          <Box style={{ height: '22px', borderTop: '1px solid #767676' }}></Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ borderTop: '1px solid #767676', padding: '5px' }}
        >
          <Box style={{ fontSize: '12px' }}>
            This is a computer generated invoice signature not required
          </Box>
        </Grid>
      </Grid>
    </Box>
  </div>
));

const TrackAssociationInvoice = (props) => {
  const componentRef = useRef();

  ComponentToPrint.displayName = "ComponentToPrint";


  return (
    <div style={{ width: '842px', margin: 'auto' }}>
      <style jsx>{`
        @media print {
          @page {
            size: landscape;
          }
        }
      `}</style>

      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />

      <ComponentToPrint ref={componentRef} props={props.info} />
    </div>
  );
};
export default TrackAssociationInvoice;
