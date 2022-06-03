import { AddCircleOutlineSharp, AddIcCallOutlined } from '@material-ui/icons';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  OutlinedInput,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import dateFormat from 'dateformat';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const paymentMethod = [
  { label: 'Cheque' },
  { label: 'Cash' },
  { label: 'NEFT/RTGS' },
  { label: 'UPI' },
];

const schema = yup
  .object({
    payoutMethod: yup.string().required(),
    finalPayout: yup.number().positive().integer().required(),
    transId: yup.string().required(),
    narattion: yup.string(),
  })
  .required();

const FinalPayOut = (props) => {
  const { lrNo, lrInfo } = props;
  const { data: session } = useSession();
  const token = session.user.access_token;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formData) => {
    const payoutMethod = formData.payoutMethod;
    if (payoutMethod === 'Cheque') {
      var reqBody = {
        lr_no: lrNo,
        narration: formData.narattion,
        amount: formData.finalPayout,
        payment_mode: formData.payoutMethod,
        // trans_id:'',
        cheque_no: formData.transId,
      };
    } else if (payoutMethod === 'Cash') {
      var reqBody = {
        lr_no: lrNo,
        narration: formData.narattion,
        amount: formData.finalPayout,
        payment_mode: formData.payoutMethod,
        // trans_id:'',
        // cheque_no:formData.transId
      };
    } else {
      var reqBody = {
        lr_no: lrNo,
        narration: formData.narattion,
        amount: formData.finalPayout,
        payment_mode: formData.payoutMethod,
        trans_id: formData.transId,
        // cheque_no:formData.transId
      };
    }

    // api call for payout final payment

    const req = await fetch(`${process.env.apiUrl}/final-vechicle-payment`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });

    const res = await req.json();

    if (res.status === 'success') {
      var data = res.data;
      var message = res.message;
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });

      // router.push('/account/final-payment-list');
      router.push(`/account/pending-consignor-payment/${lrNo}`);
    } else {
      var data = [];

      var message = res.message;
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            Final PayOut
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={12} sm={12} md={7}>
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
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  LR No. -
                </Typography>
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  ({lrNo})
                </Typography>
              </Box>
              <Divider />

              <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
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
                    <Typography style={{ width: '207px' }}>
                      LR Booking Date
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
                      <TextField
                        className="textboxpayout"
                        value={dateFormat(lrInfo.booking_date, 'dd/mm/yyyy')}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: '0.4375em !important',
                          borderRadius: '4px ',
                        }}
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
                    <Typography style={{ width: '207px' }}>
                      Unloading Date
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
                      <TextField
                        className="textboxpayout"
                        value={dateFormat(lrInfo.unload_date, 'dd/mm/yyyy')}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: '0.4375em !important',
                          borderRadius: '4px ',
                        }}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '209px' }}>
                      Total Loaded Case
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.total_goods}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '209px' }}>
                      Good Stock Received
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.receive_goods}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid container style={{ paddingTop: 10 }}>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: '10px', paddingBottom: '10px' }}
                >
                  <Typography
                    variant="p"
                    style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
                  >
                    1. Deduction
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
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
                    <Typography style={{ width: '207px' }}>Damage</Typography>
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.deductions.damage_entry.amount}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
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
                    <Typography style={{ width: '207px' }}>Short</Typography>
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.deductions.short_entry.amount}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Lead Time
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.deductions.load_time.amount}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: '10px', paddingBottom: '10px' }}
                >
                  <Typography
                    variant="p"
                    style={{ padding: '8px 14px 8px 14px', fontWeight: 'bold' }}
                  >
                    2. Paid Amount
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Unload Charges
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.unload_charge}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid container>
                <Grid item xs={12} style={{ padding: '8px 14px 8px 14px' }}>
                  <Typography variant="p" style={{ fontWeight: 'bold' }}>
                    3. Final Payout
                  </Typography>
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Total Amount
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.total_amount}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Advance Payment
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.advance_payment}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      petrol Payment
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
                      <TextField
                        className="textboxpayout"
                        value={lrInfo.petrol_payment}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Final Payout
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
                      <TextField
                        className="textboxpayout"
                        placeholder="Enter Final Payment"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                        defaultValue={lrInfo.final_payment}
                        // value={lrInfo.final_payment}
                        onChange={(e) => finalPayment(e.target.value)}
                        {...register('finalPayout', { required: true })}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Payout Method
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
                      <Autocomplete
                        options={paymentMethod}
                        sx={{ width: '100%', height: '36px' }}
                        renderInput={(params) => (
                          <TextField
                            style={{ paddingLeft: 5 }}
                            className="textboxpayout"
                            {...params}
                            placeholder="Payout method"
                            {...register('payoutMethod')}
                          />
                        )}
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
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ width: '207px' }}>
                      Txn.Id/Cheque No.
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
                      <TextField
                        className="textboxpayout"
                        placeholder="Enter Final Payment"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                        }}
                        {...register('transId', { required: true })}
                      />
                    </Box>
                  </Box>
                </Grid>

                {/* Narattion */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        width: {
                          xs: '207px !important',
                          sm: '207px !important',
                          md: '138px !important',
                          lg: '150px !important',
                        },
                      }}
                    >
                      Narattion
                    </Typography>

                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: ' 5px',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}
                    >
                      <TextareaAutosize
                        placeholder="Enter Final Payment"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          borderRadius: '4px ',
                          height: '50px',
                        }}
                        {...register('narattion')}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider />
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
                  type="submit"
                >
                  Confirmed
                </Button>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </form>
  );
};

export default FinalPayOut;
