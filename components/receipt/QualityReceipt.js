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
import { qualiTyempArr } from './ReceiptUtils';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useSession, getSession } from 'next-auth/react';
import { ToWords } from 'to-words';

function Item(props) {
  const { sx, ...other } = props;



  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
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
  createData('', 'For'),
  createData(
    <Box style={{ minHeight: 120, width: 'auto' }}>
      In publishing and graphic design, Lorem ipsum is a placeholder typeface
      without
    </Box>,
    <Box style={{ minHeight: 120, width: 'auto' }}>this is amount section </Box>
  ),

  createData('Signature of Receiver', 'Sign.'),
];
const toWords = new ToWords();

const ComponentToPrint = forwardRef((props, ref) => (
  <div ref={ref} style={{ width: '45%', margin: 20 }}>
    <Box>
      <Typography
        style={{
          textDecoration: 'underline',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: -12,
          paddingBottom: 0,
          fontWeight: 600,
        }}
      >
        Credit Memo
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
        <Box>
          <Typography
            sx={{ textAlign: 'end' }}
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            {props.mobile}
          </Typography>
          <Typography
            sx={{ textAlign: 'end' }}
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            {qualiTyempArr.mobile2}
          </Typography>

          <Typography
            sx={{ textAlign: 'end' }}
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            {qualiTyempArr.email}
          </Typography>
        </Box>
      </Item>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
      style={{ marginTop: -20 }}
    >
      <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
        <Box>
          <Typography
            sx={{ textAlign: 'start' }}
            style={{ fontSize: '12px', marginBottom: 6, fontWeight: 600 }}
          >
            No. {props.lrId}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ textAlign: 'start' }}
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            To.
          </Typography>
        </Box>
      </Item>

      <Item
        sx={{ gridRow: '1' }}
        style={{ border: 'none', display: 'flex', alignItems: 'flex-end' }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
          }}
        >
          <Typography
            sx={{ textAlign: 'end' }}
            style={{ fontSize: '12px', marginBottom: 6, fontWeight: 600 }}
          >
            Date.
          </Typography>
          <FormGroup
            style={{
              alignItems: 'end',

              marginBottom: 2,
            }}
          >
            <Input
              red
              sx={{ width: '80%' }}
              style={{ fontSize: '12px' }}
              value={dayjs(props.receipt.created_at, 'YYYY-MM-DD+h:mm').format(
                'YYYY-MM-DD'
              )}
            // {}
            />
          </FormGroup>
        </Box>
      </Item>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
    >
      <Item
        sx={{ gridRow: '1', gridColumn: 'span 4' }}
        style={{ border: 'none' }}
      >
        <Box>
          <Typography
            style={{ textAlign: 'center', fontWeight: 'bolder' }}
            variant="h6"
          >
            Sitarganj Quality Retail Outlet
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            Pllibhit Road SITARGANJ(Udham Singh Nagar) Uttarakhand
          </Typography>
          <Typography
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '12px',
            }}
          >
            Please Supply they following to our
          </Typography>
        </Box>
      </Item>
    </Box>

    <Box
      sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}
    >
      <Item sx={{ gridRow: '1', gridColumn: 'span 3' }}>
        <FormGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <InputLabel
            style={{ color: 'black', fontSize: '11px', fontWeight: 600 }}
          >
            {qualiTyempArr.driver_sh}
          </InputLabel>
          <Input
            sx={{ width: '80%' }}
            style={{ fontSize: '11px' }}
            value={
              props.receipt.driver.driver_name.toLocaleUpperCase() +
              ',   ' +
              props.receipt.driver.driver_mobile
            }
          />
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <InputLabel
            style={{ color: 'black', fontSize: '12px', fontWeight: 600 }}
          >
            {qualiTyempArr.for_veh_no + '   '}
          </InputLabel>
          <Input
            sx={{ width: '80%' }}
            style={{ fontSize: '12px' }}
            value={'    ' + props.receipt.driver.vehicle_id.toLocaleUpperCase()}
          />
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <InputLabel
            style={{ color: 'black', fontSize: '12px', fontWeight: 600 }}
          >
            {qualiTyempArr.hsd_ms}
          </InputLabel>
          <Input
            sx={{ width: '80%' }}
            style={{ fontSize: '12px' }}
            value={props.receipt.hsb_msd}
          />
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <InputLabel
            style={{ color: 'black', fontSize: '12px', fontWeight: 600 }}
          >
            {qualiTyempArr.amunt}
          </InputLabel>
          <Input
            sx={{ width: '80%' }}
            style={{ fontSize: '12px' }}
            value={props.receipt.amount}
          />
        </FormGroup>
        <FormGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <InputLabel
            style={{ color: 'black', fontSize: '12px', fontWeight: 600 }}
          >
            In Words :
          </InputLabel>
          <Input
            sx={{ width: '80%' }}
            style={{ fontSize: '12px' }}
            value={toWords.convert(props.receipt.amount) + ' Rupees Only'}
          />
        </FormGroup>

      </Item>
    </Box>

    <Box style={{ padding: 8 }}>
      <Typography
        style={{
          paddingLeft: 8,
          textAlign: 'start',
          fontSize: '12px',
          borderTop: '1px solid #e0e0e0',
          fontWeight: 600,
        }}
      >
        and Debit to our account
      </Typography>
      <TableContainer
        style={{ overflowX: 'inherit' }}
        sx={{ border: '1px solid#808080 !important' }}
      >
        <Table aria-label="simple table">
          <TableHead id="invoiceTable">
            <TableRow> </TableRow>
          </TableHead>
          <TableBody id="invoicetbody">
            {/* {rows.map((row) => ( */}
            <TableRow>
              <TableCell style={{ width: '40%', height: 'auto' }}>
                <Box
                  height={200}
                  justifyContent="space-between"
                  alignItems={'baseline'}
                >
                  {/* In words- {toWords.convert(props.receipt.amount)} Rupees Only */}
                </Box>
                <Typography style={{ fontWeight: 600, fontSize: '12px' }}>
                  Signature of Receiver
                </Typography>
              </TableCell>

              <TableCell style={{ width: '60%' }} align="left">
                <Box
                  height={200}
                  justifyContent="space-between"
                  alignItems={'baseline'}
                >
                  <Typography style={{ fontWeight: 600, fontSize: '12px' }}>
                    For
                  </Typography>
                  <Typography style={{ fontSize: '12px' }}>
                    {props.receipt.hsb_msd}
                  </Typography>
                </Box>
                <Typography style={{ fontWeight: 600, fontSize: '12px' }}>
                  Sign
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </div>
));

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const QualityReceipt = () => {
  const router = useRouter();
  const [recptData, setRecptData] = React.useState();

  // 
  const componentRef = useRef();

  const { data: session } = useSession();
  const token = session.user.access_token;

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());
  const { data, error } = useSWR(
    `${process.env.apiUrl}/advance-payments/${router.query.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // if () {
  // data && setRecptData(data.data);
  // }
  // 
  const receipt = data.data.petrol_pump_payments.items[0];

  ComponentToPrint.displayName = 'ComponentToPrint';

  return (
    <div
      style={{
        width: '842px',
        margin: 'auto',
        textAlign: 'center',
        marginTop: 10,
      }}
    >
      <style jsx>{`
        @media print {
          @page {
            size: a4 landscape;
          }
        }
      `}</style>

      <ReactToPrint
        trigger={() => (
          <button style={{ marginRight: 155 }}>Print this out!</button>
        )}
        content={() => componentRef.current}
      />

      {receipt && (
        <ComponentToPrint
          ref={componentRef}
          receipt={receipt}
          lrId={router.query.id}
        />
      )}
    </div>
  );
};
export default QualityReceipt;
