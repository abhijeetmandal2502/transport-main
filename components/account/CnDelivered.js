import {
  AddCircleOutlineSharp,
  RemoveCircleOutlineSharp,
} from '@material-ui/icons';
import {
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
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ModalConfirmation from '../../components/ModalConfirmation';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

import { useRouter } from 'next/router';

const CnDelivered = (props) => {
  const [damage, setDamage] = useState(false);
  const [short, setShort] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadedCase, setLoadedCase] = useState('');

  const { lrNo } = props;
  const { data: session, status } = useSession();
  const token = session && session.user.access_token;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');

  const onSubmit = async (data) => {

    var damage_amount = 0;
    var damage_narration = '';
    var short_amount = 0;
    var short_narration = '';
    var load_amount = 0;
    var load_narration = '';
    if ((data.damage_amount == undefined || data.damage_amount == '') && (data.damage_narration == undefined || data.damage_narration == '')) {

    } else {
      damage_amount = data.damage_amount;
      damage_narration = data.damage_narration;

    }

    if ((data.short_amount == undefined || data.short_amount == '') && (data.short_narration == undefined || data.short_narration == '')) {

    }
    else {
      short_amount = data.short_amount;
      short_narration = data.short_narration;
    }

    if ((data.load_amount == undefined || data.load_amount == '') && (data.load_narration == undefined || data.load_narration == '')) {

    }
    else {
      load_amount = data.load_amount;
      load_narration = data.load_narration;
    }


    setFormData({
      lr_no: lrNo,
      arrive_date: data.arrive_date,
      unload_date: data.unload_date,
      total_goods: parseFloat(data.total_goods),
      receive_goods: parseFloat(data.receive_goods),
      unload_charge: parseFloat(data.unload_charge),
      deductions: JSON.stringify([
        {
          title: 'damage_entry',
          amount: damage_amount,
          narration: damage_narration,
        },

        {
          title: 'short_entry',
          amount: short_amount,
          narration: short_narration,
        },

        {
          title: 'load_time',
          amount: load_amount,
          narration: load_narration,
        },
      ]),
    });


    setModalData([
      { fieldName: 'Booking No', data: lrNo },
      {
        fieldName: 'Arrival Date',
        data: data.arrive_date,
      },
      { fieldName: 'Unloading Date ', data: data.unload_date },
      { fieldName: 'Total Loaded Case', data: data.total_goods },
      { fieldName: 'Good Stock Received', data: data.receive_goods },
      { fieldName: 'Unloading Charges', data: data.unload_charge },
      { fieldName: 'Damage Entry', data: data.damage_amount },
      { fieldName: 'Damage Narration', data: data.damage_narration },
      { fieldName: 'Short Entry', data: data.short_amount },
      { fieldName: 'Short Narration', data: data.short_narration },
      { fieldName: 'Load Entry', data: data.load_amount },
      { fieldName: 'Load Narration', data: data.load_narration },
    ]);

    setModalShow(true);
    setOpen(true);
  };
  const router = useRouter();
  const submitForm = async () => {
    setOpen(false);
    const res = await fetch(`${process.env.apiUrl}/vehicle-unload`, {
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });

    const result = await res.json();


    if (result.status === 'success') {
      var message = result.message;
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/account/unload-vehicle');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  // get total loaded case from useEffect 
  useEffect(() => {
    totalLoadedCase()
  }, [lrNo])

  const totalLoadedCase = async () => {
    const req = await fetch(`${process.env.apiUrl}/total-loaded-cases/${lrNo}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const res = await req.json();

    if (res.status === 'success') {
      setLoadedCase(res.totalPackages)
    }
  }

  const updateLoadCase = (value) => {
    setLoadedCase(value)
  }


  return (
    <>
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
            CN Delivered
          </Typography>
        </Grid>
      </Grid>{' '}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  LR No. ({lrNo})
                </Typography>
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
                      <Typography style={{ width: '179px' }}>
                        Arrival Date
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
                          placeholder="Enter Date  "
                          type="date"
                          {...register('arrive_date', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
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
                      <Typography style={{ width: '179px' }}>
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
                        <OutlinedInput
                          placeholder="Enter Unloading Date  "
                          type="date"
                          {...register('unload_date', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ padding: '8px 14px 8px 14px' }}
                  ></Grid>
                </Grid>
                <Divider />
                <Typography
                  variant="h6"
                  style={{ padding: '8px 14px 8px 14px' }}
                >
                  CN Received Entry
                </Typography>
                <Divider />
                <Grid container style={{ paddingTop: 10 }}>
                  <Grid
                    item
                    xs={12}
                    style={{ paddingTop: '10px', paddingBottom: '10px' }}
                  >
                    <Typography
                      variant="p"
                      style={{
                        padding: '8px 14px 8px 14px',
                        fontWeight: 'bold',
                      }}
                    >
                      1. Damage Entry
                    </Typography>
                    <Typography
                      variant="p"
                      style={{
                        float: 'right',
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                      onClick={() => setDamage(!damage)}
                    >
                      {damage == true ? (
                        <RemoveCircleOutlineSharp />
                      ) : (
                        <AddCircleOutlineSharp />
                      )}
                    </Typography>
                  </Grid>

                  {damage == true ? (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={5}
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
                          <Typography>Amount</Typography>
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
                              placeholder="Enter Amount  "
                              type="number"
                              {...register('damage_amount', {
                                required: damage == true ? true : false,
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
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={7}
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
                          <Typography>Narration</Typography>
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
                            <TextareaAutosize
                              {...register('damage_narration', {
                                required: damage == true ? true : false,
                              })}
                              placeholder="Enter Narration"
                              style={{
                                width: '-webkit-fill-available',
                                paddingLeft: 5,
                                height: '37px',
                                borderRadius: '4px ',
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  ) : null}
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
                      style={{
                        padding: '8px 14px 8px 14px',
                        fontWeight: 'bold',
                      }}
                    >
                      2. Short Entry
                    </Typography>
                    <Typography
                      variant="p"
                      style={{
                        float: 'right',
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                      onClick={() => setShort(!short)}
                    >
                      {short == true ? (
                        <RemoveCircleOutlineSharp />
                      ) : (
                        <AddCircleOutlineSharp />
                      )}
                    </Typography>
                  </Grid>
                  {short == true ? (
                    <>
                      <Grid item xs={12} md={5} style={{ padding: '10px' }}>
                        <Box
                          style={{
                            marginBottom: 8,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'baseline',
                          }}
                        >
                          <Typography>Amount</Typography>
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
                              placeholder="Enter Amount  "
                              type="number"
                              {...register('short_amount', {
                                required: short == true ? true : false,
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
                      </Grid>
                      <Grid item xs={12} md={7} style={{ padding: '10px' }}>
                        <Box
                          style={{
                            marginBottom: 8,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'baseline',
                          }}
                        >
                          <Typography>Narration</Typography>
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
                            <TextareaAutosize
                              placeholder="Enter Narration"
                              {...register('short_narration', {
                                required: short == true ? true : false,
                              })}
                              style={{
                                width: '-webkit-fill-available',
                                paddingLeft: 5,
                                height: '37px',
                                borderRadius: '4px ',
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  ) : null}
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
                      style={{
                        padding: '8px 14px 8px 14px',
                        fontWeight: 'bold',
                      }}
                    >
                      3. Lead Time
                    </Typography>
                    <Typography
                      variant="p"
                      style={{
                        float: 'right',
                        paddingRight: 10,
                        fontWeight: 'bold',
                      }}
                      onClick={() => setLoad(!load)}
                    >
                      {load == true ? (
                        <RemoveCircleOutlineSharp />
                      ) : (
                        <AddCircleOutlineSharp />
                      )}
                    </Typography>
                  </Grid>
                  {load == true ? (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={5}
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
                          <Typography>Amount</Typography>
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
                              placeholder="Enter Amount  "
                              type="number"
                              {...register('load_amount', {
                                required: load == true ? true : false,
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
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={7}
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
                          <Typography>Narration</Typography>
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
                            <TextareaAutosize
                              placeholder="Enter Narration"
                              {...register('load_narration', {
                                required: load == true ? true : false,
                              })}
                              style={{
                                width: '-webkit-fill-available',
                                paddingLeft: 5,
                                height: '37px',
                                borderRadius: '4px ',
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  ) : null}
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <Typography style={{ width: '185px' }}>
                      Total Loaded Case
                    </Typography>
                  </Grid>
                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <OutlinedInput
                      placeholder=" Total Loaded Case"
                      value={loadedCase}
                      type="number"
                      {...register('total_goods', { required: true })}
                      style={{
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      onChange={(e) => updateLoadCase(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <Typography style={{ width: '185px' }}>
                      Good Stock Recieved
                    </Typography>
                  </Grid>
                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <OutlinedInput
                      placeholder="Good Stock Recieved"
                      type="number"
                      {...register('receive_goods', { required: true })}
                      style={{
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                    />
                  </Grid>

                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <Typography style={{ width: '185px' }}>
                      Unloading charges
                    </Typography>
                  </Grid>
                  <Grid item xs={3} style={{ padding: '8px 14px 8px 14px' }}>
                    <OutlinedInput
                      placeholder="Unload Charge"
                      type="number"
                      {...register('unload_charge', { required: true })}
                      style={{
                        float: 'left',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider />

                <Divider />
                <Box
                  style={{
                    paddingTop: 16,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    style={{ background: '#28a745', color: 'white' }}
                  >
                    Confirmed
                  </Button>
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </form>
      <ModalConfirmation
        open={open}
        setOpen={setOpen}
        confirmationData={modalData}
        submitMethod={submitForm}
        title={'Unload Confirmation Details'}
      />
    </>
  );
};

export default CnDelivered;
