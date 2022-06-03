import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Autocomplete,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import BackButton from '../buttons/BackButton';
import DatePickers from '../DatePickers';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ModalConfirmation from '../../components/ModalConfirmation';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import {
  Add,
  Remove,
  ArrowBackRounded,
  DoubleArrow,
  ShoppingBasket,
  ShoppingCart,
  Visibility,
  Search,
} from '@material-ui/icons';

const NewAdvancePaymentForm = (props) => {
  const router = useRouter();

  const { petrolPumpData, price } = props;
  const [paymentChequeEnable, setPaymentChequeEnable] = React.useState(false);
  const [transIdEnable, setTransIdEnable] = React.useState(false);
  const lrNo = router.query.id;

  const [showPetrolPart, setShowPetrolPart] = useState(true);
  const [showAmountPart, setShowAmountPart] = useState(true);
  const [pPrice, setPprice] = useState('');
  const [cPrice, setCprice] = useState('');

  const paymentMode = [
    { label: 'Cash' },
    { label: 'Bank' },
    { label: 'Cheque' },
    { label: 'Rtgs' },
    { label: 'NFT' },
    { label: 'UPI' },
  ];

  const petrolPumpDetails = [];
  const [petrolPumpState, setPetrolPumpState] = useState('');

  if (petrolPumpData.length > 0) {
    petrolPumpData.map((petrol) => {
      petrolPumpDetails.push({ name: petrol.pump_name, id: petrol.pump_id });
    });
  }

  const { data: session } = useSession();
  const token = session.user.access_token;

  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');
  const [showButton, setShowButton] = useState(true);

  const onSubmit = async (data) => {
    setFormData({
      lr_no: lrNo,
      pump_name: petrolPumpState,
      petrol_amount: data.petrol_amount,
      hsb_msd: data.hsd,
      created_at: data.date,
      narration: data.narration,
      advance_amount: data.actual_amt,
      payment_mode: data.payment_mode,
      trans_id: data.transaction_id,
      cheque_no: data.cheque_id,
    });

    setModalData([
      { fieldName: 'LR Number', data: lrNo },
      { fieldName: 'Date', data: data.date },
      { fieldName: 'Pump Name', data: data.petrol_pump_name },
      { fieldName: 'Amount', data: data.petrol_amount },
      { fieldName: 'HSD/MSD', data: data.hsd },
      { fieldName: 'Amount', data: data.actual_amt },
      { fieldName: 'Narration', data: data.narration },
      { fieldName: 'Payment Mode', data: data.payment_mode },
    ]);

    setModalShow(true);
    setOpen(true);
  };

  const submitForm = async () => {
    setOpen(false);
    //

    const res = await fetch(`${process.env.apiUrl}/advance-payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.status === 'success') {
      enqueueSnackbar(result.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      // router.push('/account/advance-payment');
      router.push(`/account/unload-vehicle/${lrNo}`);
    } else {
      enqueueSnackbar(result.errors, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }

    //
  };

  const checkBalance = () => {
    // console.log(pPrice + ' ' + typeof cPrice)
    if (parseFloat(pPrice) + parseFloat(cPrice) > parseFloat(price)) {
      setShowButton(!showButton);
      alert(`Estimated Amount is ${price} that is exceeded`);
    } else {
      setShowButton(true);
    }
  };

  // end of form
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
            New Payment
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
            <BackButton url={'/account/advance-payment'} />
          </Box>
        </Grid>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={12} sm={12} md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                style={{ paddingBottom: 16, paddingTop: 16 }}
                elevation={4}
              >
                {/* Petrol Pump Info */}
                <Box
                  style={{
                    display: 'block',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 3,
                    paddingBottom: 16,
                  }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography style={{ fontWeight: 700, color: 'darkred' }}>
                      Estimated Price - {price}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Date</Typography>
                    <Box
                      className="drivdetailsbx"
                      style={{
                        width: '60%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        marginLeft: 6,
                      }}
                    >
                      <DatePickers
                        register={register('date', { required: true })}
                      />
                    </Box>
                  </Box>
                </Box>
                <Divider />

                <Box
                  display={'flex'}
                  justifyContent="space-between"
                  justifyItems="center"
                  marginY={'auto'}
                  alignItems="center"
                  paddingY={2}
                  paddingX={2}
                >
                  <Typography
                    variant="h6"
                    style={
                      {
                        // paddingLeft: 16,
                        // paddingRight: 16,
                        // paddingBottom: 16,
                      }
                    }
                  >
                    Petrol Pump Info
                  </Typography>
                  {!showPetrolPart ? (
                    <Add
                      onClick={() => {
                        setShowPetrolPart(!showPetrolPart);
                      }}
                    />
                  ) : (
                    <Remove
                      onClick={() => {
                        setShowPetrolPart(!showPetrolPart);
                      }}
                    />
                  )}
                </Box>
                <Divider />
                {showPetrolPart ? (
                  <Box
                    style={{
                      display: 'block',
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                      paddingBottom: 16,
                    }}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>Amount</Typography>
                      <Box
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        <OutlinedInput
                          type="number"
                          placeholder="Enter Amount"
                          value={pPrice}
                          {...register('petrol_amount', {
                            required: showPetrolPart ? true : false,
                          })}
                          onChange={(event) => {
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value;
                            setPprice(event.target.value);
                            checkBalance();
                          }}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>HSD/MS</Typography>
                      <Box
                        className="drivdetailsbx"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        <OutlinedInput
                          placeholder="Enter HSD/MS"
                          {...register('hsd', {
                            required: showPetrolPart ? true : false,
                          })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>Petrol Pump</Typography>
                      <Box
                        className="drivdetailsbx"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        <Autocomplete
                          style={{ width: '100%' }}
                          disablePortal
                          className="autocomp1"
                          id="combo-box-demo"
                          options={petrolPumpDetails.map((data) => {
                            return data.name;
                          })}
                          onChange={(event, value) => {
                            //
                            for (var i = 0; i < petrolPumpDetails.length; i++) {
                              if (value === petrolPumpDetails[i].name) {
                                setPetrolPumpState(petrolPumpDetails[i].id);
                              } else {
                              }
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // value={petrolPumpId}

                              {...register('petrol_pump_name', {
                                required: showPetrolPart ? true : false,
                              })}
                              placeholder="Select Pretrol Pump"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <div></div>
                )}
                <Divider />

                {/* Payment Info */}

                {/* <Typography
                  variant="h6"
                  style={{
                    paddingLeft: 16,
                    paddingTop: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                  }}
                >
                  Payment Info
                </Typography> */}
                <Box
                  display={'flex'}
                  justifyContent="space-between"
                  justifyItems="center"
                  marginY={'auto'}
                  alignItems="center"
                  paddingY={2}
                  paddingX={2}
                >
                  <Typography
                    variant="h6"
                    style={
                      {
                        // paddingLeft: 16,
                        // paddingRight: 16,
                        // paddingBottom: 16,
                      }
                    }
                  >
                    Payment Info
                  </Typography>
                  {!showAmountPart ? (
                    <Add
                      onClick={() => {
                        setShowAmountPart(!showAmountPart);
                      }}
                    />
                  ) : (
                    <Remove
                      onClick={() => {
                        setShowAmountPart(!showAmountPart);
                      }}
                    />
                  )}
                </Box>
                <Divider />
                {showAmountPart ? (
                  <Box
                    style={{
                      display: 'block',
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                      paddingBottom: 16,
                    }}
                  >
                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>Amount</Typography>
                      <Box
                        className="drivdetailsbx"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        {' '}
                        <OutlinedInput
                          placeholder="Enter Amount"
                          type="number"
                          value={cPrice}
                          {...register('actual_amt', {
                            required: showAmountPart ? true : false,
                          })}
                          onChange={(event) => {
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value;
                            setCprice(event.target.value);
                            checkBalance();
                          }}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>Narration</Typography>
                      <Box
                        className="drivdetailsbx"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={4}
                          placeholder="Enter Narration"
                          {...register('narration', {
                            required: showAmountPart ? true : false,
                          })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            // height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        marginBottom: 8,
                        // display: { xs: "block", sm: "flex", md: "flex" },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                      }}
                    >
                      <Typography>Payment Mode</Typography>
                      <Box
                        className="drivdetailsbx"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      >
                        <Autocomplete
                          style={{ width: '100%' }}
                          disablePortal
                          className="autocomp1"
                          id="combo-box-demo"
                          onChange={(event, value) => {
                            if (value !== null) {
                              if (value.label === 'Cheque') {
                                setPaymentChequeEnable(true);
                                setTransIdEnable(false);
                              } else if (
                                value.label == 'Rtgs' ||
                                value.label == 'NFT' ||
                                value.label == 'UPI'
                              ) {
                                setTransIdEnable(true);
                                setPaymentChequeEnable(false);
                              } else {
                                setTransIdEnable(false);
                                setPaymentChequeEnable(false);
                              }
                            }
                          }}
                          options={paymentMode}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Payment Mode"
                              {...register('payment_mode', {
                                required: showAmountPart ? true : false,
                              })}
                            />
                          )}
                        />
                      </Box>
                    </Box>

                    {paymentChequeEnable ? (
                      <Box
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography>Cheque Number</Typography>
                        <Box
                          className="drivdetailsbx"
                          style={{
                            width: '60%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'space-between',
                            marginLeft: 10,
                          }}
                        >
                          <OutlinedInput
                            placeholder="Enter Cheque Number"
                            {...register('cheque_id', {
                              required: paymentChequeEnable ? true : false,
                            })}
                            style={{
                              width: '-webkit-fill-available',
                              paddingLeft: 5,
                              height: 36,
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <div></div>
                    )}

                    {transIdEnable ? (
                      <Box
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                        }}
                      >
                        <Typography>Transaction Id </Typography>
                        <Box
                          className="drivdetailsbx"
                          style={{
                            width: '60%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'space-between',
                            marginLeft: 10,
                          }}
                        >
                          <OutlinedInput
                            placeholder="Enter Transaction Id"
                            {...register('transaction_id', {
                              required: transIdEnable ? true : false,
                            })}
                            style={{
                              width: '-webkit-fill-available',
                              paddingLeft: 5,
                              height: 36,
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <div></div>
                    )}
                  </Box>
                ) : (
                  <div></div>
                )}
                <Divider />
                <Box
                  style={{
                    paddingTop: 16,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {showButton && (
                    <Button
                      variant="outlined"
                      type="submit"
                      style={{ background: '#28a745', color: 'white' }}
                    >
                      Confirmed
                    </Button>
                  )}
                </Box>
              </Paper>
            </Container>
          </form>
        </Grid>
        <ModalConfirmation
          open={open}
          setOpen={setOpen}
          confirmationData={modalData}
          submitMethod={submitForm}
          title={'Vehicle Assignment Confirmation Details'}
        />
      </Grid>
    </div>
  );
};

export default NewAdvancePaymentForm;
