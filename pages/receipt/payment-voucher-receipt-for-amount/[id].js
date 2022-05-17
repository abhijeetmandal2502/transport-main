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
import { pmtVoucherTempArr } from './../../../components/receipt/ReceiptUtils';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { useSession, getSession } from 'next-auth/react';
import { ToWords } from 'to-words';
// import PaymentVoucherReceiptForAsset from '../payment-voucher-receipt-for-amount/[id]';
const toWords = new ToWords();
function Item(props) {
  const { sx, ...other } = props;

  // 

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

const rows = [createData('', 'Rs.')];

const ComponentToPrint = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%',
      margin: 'auto',
      display: 'flex',
      justifyContent: ' space-around',
      marginTop: 10,
      marginBottom: 30,
    }}
  >
    <div style={{ width: '90%' }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoColumns: '1fr',
          gap: 1,
        }}
      >
        <Item
          sx={{ gridRow: '1', gridColumn: 'span 5' }}
          style={{ border: 'none', width: ' 100%' }}
        >
          <Box>
            <Typography
              variant="h5"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 'large',
              }}
            >
              {pmtVoucherTempArr.title}{' '}
            </Typography>
            <Typography
              style={{
                textAlign: 'center',
                fontSize: 'smaller',
              }}
            >
              ({pmtVoucherTempArr.sub_title})
            </Typography>
          </Box>
        </Item>
        <Item
          sx={{ gridRow: '1', gridColumn: 'span 3' }}
          style={{
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
              style={{ fontSize: '12px', marginTop: 6, fontWeight: 600 }}
            >
              {' '}
              Date.
            </Typography>
            <FormGroup
              style={{
                alignItems: 'end',
                width: 'auto',
                marginBottom: 5,
                fontWeight: 600,
              }}
            >
              <Input
                sx={{ width: '95%' }}
                style={{ fontSize: '12px' }}
                value={dayjs(
                  props.receipt.created_at,
                  'YYYY-MM-DD+h:mm'
                ).format('YYYY-MM-DD')}
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
                fontWeight: 600,
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

      <Box style={{ padding: 10 }}>
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
              {/* {rows.map((row) => ( */}
              <TableRow

              // key={row.Packages}
              //  sx={{ '#invoicelasttd:last-child, #invoicelasttd:last-child': { borderTop: 1, } }}
              >
                <TableCell
                  style={{
                    verticalAlign: 'top',
                    width: '85%',
                    padding: 0,
                    height: 160,
                  }}
                >
                  <Typography
                    style={{
                      padding: 10,
                      color: 'black',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    NARRATION-
                  </Typography>
                  <Typography
                    style={{ padding: 10, color: 'black', fontSize: '12px' }}
                  >
                    {props.receipt.narration}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ paddingTop: '0px !important', paddingRight: 0 }}
                  style={{
                    width: '15%',
                    height: 160,

                    display: 'contents',
                  }}
                  align="left"
                >
                  <Typography
                    style={{
                      padding: 10,
                      color: 'black',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Rs.
                  </Typography>
                  <Typography
                    style={{ padding: 10, color: 'black', fontSize: '12px' }}
                  >
                    {/* In words- */}
                    <br />
                    {/* {toWords.convert()} Rupees Only
                     */}
                    {props.receipt.amount}
                  </Typography>

                  {/* {row.Discription} */}
                </TableCell>
              </TableRow>
              <TableRow

              // key={row.Packages}
              //  sx={{ '#invoicelasttd:last-child, #invoicelasttd:last-child': { borderTop: 1, } }}
              >
                <TableCell
                  style={{
                    width: '85%',
                    padding: 0,
                    height: 35,
                  }}
                >
                  <div>
                    <Item
                      sx={{ gridRow: '1', paddingLeft: 0, paddingRight: 0 }}
                      style={{
                        display: 'flex',
                        border: 'none',
                      }}
                    >
                      <Box
                        style={{
                          marginRight: 10,
                          // width: '50%',
                          display: 'flex',
                          justifyCotent: 'space-between',

                          alignItems: 'end',
                        }}
                      >
                        <Typography
                          sx={{ textAlign: 'start' }}
                          style={{
                            fontSize: '12px',
                            marginBottom: 6,
                            width: 'auto',
                            marginRight: 5,
                            fontWeight: 600,
                          }}
                        >
                          {pmtVoucherTempArr.pmt_method}-
                        </Typography>
                        <FormGroup
                          style={{
                            alignItems: 'end',
                            width: 'inherit',
                            marginBottom: 2,
                          }}
                        >
                          <Input
                            style={{ fontSize: '12px', width: '100%' }}
                            value={props.receipt.method}
                          />
                        </FormGroup>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          width: 'fit-content',
                          justifyCotent: 'space-between',
                          alignItems: 'end',
                        }}
                      >
                        <Typography
                          sx={{ textAlign: 'start' }}
                          style={{
                            fontSize: '12px',
                            marginBottom: 6,
                            marginRight: 5,
                            width: 'auto',
                            fontWeight: 600,
                          }}
                        >
                          {pmtVoucherTempArr.checkno_trans_id}-
                        </Typography>
                        <FormGroup
                          style={{
                            alignItems: 'end',
                            width: 'inherit',
                            marginBottom: 2,
                          }}
                        >
                          <Input
                            // sx={{ width: "80%" }}

                            value={props.receipt.txn_id}
                            style={{ fontSize: '12px', width: '100%' }}
                          />
                        </FormGroup>
                      </Box>
                    </Item>
                    <Item
                      sx={{ gridRow: '1' }}
                      style={{
                        display: 'flex',
                        border: 'none',
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginTop: -20,

                          // alignItems: 'end',
                        }}
                      >
                        <Typography
                          sx={{ textAlign: 'end' }}
                          style={{
                            fontSize: '12px',
                            width: 'auto',
                            fontWeight: 600,
                          }}
                        >
                          In words-{toWords.convert(props.receipt.amount)} Rupees Only

                        </Typography>

                        <Typography
                          // sx={{ textAlign: 'end' }}
                          style={{
                            fontSize: '12px',
                            width: 'auto',
                            fontWeight: 600,
                            justifyContent: 'flex-end',
                          }}
                        >
                          Total Amount-

                        </Typography>

                      </Box>
                    </Item>
                  </div>
                  {/* {row.Packages} */}
                </TableCell>
                <TableCell
                  style={{
                    width: '15%',
                    height: 35,
                    verticalAlign: 'bottom',
                    padding: '10 10 10 10',
                  }}
                  align="left"
                >
                  {props.receipt.amount}
                </TableCell>
              </TableRow>
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
        style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'start' }}
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
              style={{
                fontSize: '12px',
                marginBottom: 6,
                width: '100%',
                fontWeight: 600,
              }}
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
              style={{
                fontSize: '12px',
                marginBottom: 6,
                width: '100%',
                fontWeight: 600,
              }}
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
              style={{
                fontSize: '12px',
                marginBottom: 6,
                width: '100%',
                fontWeight: 600,
              }}
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
              width: 114,
              marginRight: 'inherit',
              textAlign: 'auto',
            }}
          >
            <Typography
              style={{
                textAlign: 'center',
                width: '100%',
                margin: 'auto',
                fontWeight: 600,
              }}
            >
              Stamp
            </Typography>
          </Box>
        </Item>
      </Box>
    </div>
  </div>
));
// const fetcher = (...args) => fetch(...args).then((res) => res.json());
const PaymentVoucherReceiptForAmount = () => {
  const componentRef = useRef();
  const router = useRouter();


  const [recptData, setRecptData] = React.useState();
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

  // 

  const { data, error } = useSWR(
    `${process.env.apiUrl}/advance-payments/${router.query.id}`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (data) {
    const receipt = data.data.advance_payment.items[0];
  }


  ComponentToPrint.displayName = 'componentToPrint';
  return (
    <div
      style={{
        width: '842px',
        margin: 'auto',
        textAlign: 'end',
        marginTop: 10,
      }}
    >
      <style jsx>{`
        @media print {
          @page {
            size: a4;
          }
        }
      `}</style>

      <ReactToPrint
        trigger={() => (
          <button style={{ marginRight: 56 }}>Print this out!</button>
        )}
        content={() => componentRef.current}
      />

      {receipt && (
        <ComponentToPrint
          ref={componentRef}
          receipt={receipt}
          lrNo={router.query.id}
        />
      )}
    </div>
  );
};
export default PaymentVoucherReceiptForAmount;
