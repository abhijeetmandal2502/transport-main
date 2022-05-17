import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import dateFormat from 'dateformat';
import { ToWords } from 'to-words';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const ConsignorPaymentClear = (props) => {
  const { info } = props;
  const [biltyStatus, setBiltyStatus] = useState(info.bilty.status);
  const [totalAmount, setTotalAmount] = useState(info.bilty.system_amount);
  const [recievedAmt, setRecievedAmt] = useState(0);
  const [tds, setTds] = useState((info.bilty.system_amount * 2) / 100);
  const [payMode, setPayMode] = useState('NEFT');
  const [date, setDate] = useState(info.bilty.receipt_date)
  const router = useRouter();

  const { data: session } = useSession();
  const token = session.user.access_token;
  const { enqueueSnackbar } = useSnackbar();
  const lrNo = router.query.biltyNo[0];
  const biltyNo = router.query.biltyNo[1];

  const bookingDateSelect = (date) => {
    setDate(date);
  }

  const handleChange = (event) => {
    setBiltyStatus(event.target.value);
  };
  const submitForm = async () => {
    const finalAmt = biltyStatus === 'approved' ? recievedAmt : totalAmount
    if (totalAmount > 0) {
      if (date !== '') {
        try {
          const req = await fetch(`${process.env.apiUrl}/bilty-update/${biltyNo}`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              amount: finalAmt,
              status: biltyStatus,
              receipt_date: date,
              tds_amount: tds,
              payment_mode: payMode

            })
          })

          const res = await req.json();
          if (res.status === 'success') {

            enqueueSnackbar(res.message, {
              variant: 'success',
            })
            if (biltyStatus == 'approved') {
              router.push(`/account/pending-consignor-payment`)
            }
            else {
              router.push(`/account/pending-consignor-payment/${lrNo}`)
            }

          }
          else {
            enqueueSnackbar(res.errors, {
              variant: 'error',
            })
          }
        }
        catch (err) {
          alert(err)
        }
      }
      else {
        alert("Plese select Entry date")
      }



    } else {
      alert('Total will be greater then 0');
    }
  };

  const toWords = new ToWords();
  return (
    <>
      <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={12} sm={12} md={8} lg={7}>
          <Container
            style={{
              alignItems: 'center',
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <Paper
              sx={{ width: '100%', overflow: 'hidden' }}
              style={{ paddingBottom: 16 }}
              elevation={4}
            >
              <Box style={{ display: 'flex' }}>
                {' '}
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
                >
                  LR No.
                </Typography>
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
                >
                  {info.lr_id}
                </Typography>
              </Box>

              <Divider />

              <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Bilty No:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {info.bilty.invoice_no}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Shipment No:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {info.shipment_no}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '25%', fontWeight: 'bold' }}>
                      Consignor Name:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {info.consignor_name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      GST No:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {info.consignor_gst_no}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center ',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Date:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <OutlinedInput
                        type="date"
                        value={date}
                        style={{
                          // width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        onChange={(e) => bookingDateSelect(e.target.value)}

                      />

                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Typography
                variant="h6"
                style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
              >
                Bilty Description
              </Typography>
              <Divider />

              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ padding: '8px 14px 8px 14px' }}
                ></Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Total Weight:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {parseFloat(info.bilty.weight) +
                          ' ' +
                          info.bilty.weight_unit}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Package/Unit
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <Typography
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                      >
                        {info.bilty.package + ' Pcs'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Total Amount:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <OutlinedInput
                        type="number"
                        placeholder="Total Amount"
                        value={totalAmount}
                        InputProps={{
                          readOnly:
                            info.bilty.status != 'pending' ? true : null,
                        }}
                        style={{
                          // width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        onChange={(e) =>
                          setTotalAmount(
                            e.target.value > 0 ? e.target.value : ''
                          )
                        }
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                      Status:
                    </Typography>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <FormControl fullWidth>
                        <Select
                          style={{ height: 42 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={biltyStatus}
                          onChange={handleChange}
                        >
                          <MenuItem
                            style={{ padding: 16, display: 'block' }}
                            value="pending"
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            style={{ padding: 16, display: 'block' }}
                            value="processing"
                          >
                            Processing
                          </MenuItem>
                          <MenuItem
                            style={{ padding: 16, display: 'block' }}
                            value="approved"
                          >
                            Approved
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider />

              {/* this module is used for approved payment via consignor */}
              {

                biltyStatus === 'approved' ? <>
                  <Typography
                    variant="h6"
                    style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
                  >
                    Payment Recieved
                  </Typography>
                  <Divider />

                  <Grid container>

                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{ padding: '8px 14px 8px 14px' }}
                    >
                      <Box
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                          Recieved Amount:
                        </Typography>
                        <Box
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'space-between',
                            marginLeft: 10,
                          }}
                        >
                          <OutlinedInput
                            placeholder="Recieved Amount"
                            style={{
                              width: '-webkit-fill-available',
                              paddingLeft: 5,
                              height: 42,
                              borderRadius: '4px ',
                            }}

                            value={recievedAmt}
                            onChange={(e) => setRecievedAmt(e.target.value)}


                          />

                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{ padding: '8px 14px 8px 14px' }}
                    >
                      <Box
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                          TDS
                        </Typography>
                        <Box
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'space-between',
                            marginLeft: 10,
                          }}
                        >
                          <OutlinedInput
                            placeholder="TDS"
                            style={{
                              width: '-webkit-fill-available',
                              paddingLeft: 5,
                              height: 42,
                              borderRadius: '4px ',
                            }}
                            value={tds}
                            onChange={(e) => setTds(e.target.value)}

                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{ padding: '8px 14px 8px 14px' }}
                    >
                      <Box
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography style={{ width: '74%', fontWeight: 'bold' }}>
                          Payment Mode:
                        </Typography>
                        <Box
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'space-between',
                            marginLeft: 10,
                          }}
                        >
                          <FormControl fullWidth>
                            <Select
                              style={{ height: 42 }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={payMode}
                            >
                              <MenuItem
                                style={{ padding: 16, display: 'block' }}
                                value={payMode}
                              >
                                {payMode}
                              </MenuItem>

                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </> : null
              }


              <Divider />

              {/* End of this module is used for approved payment via consignor */}

              <Box
                style={{
                  paddingTop: 16,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  style={{ background: '#28a745', color: 'white' }}
                  onClick={() => submitForm()}
                >
                  Update
                </Button>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default ConsignorPaymentClear;
