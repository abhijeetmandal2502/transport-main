import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import BackButton from '../buttons/BackButton';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ModalConfirmation from '../../components/ModalConfirmation';
import useSWR from 'swr';

const NewBilty = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: session, status } = useSession();

  const empId = session && session.user.emp_id;
  const token = session && session.user.access_token;
  const [shipment_no, setShipmentNo] = useState('');

  const bookingNo = router.query.id;

  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');
  const vehileOwnership = [{ label: 'India' }, { label: 'Nepal' }];
  const weightStandard = [{ label: 'ton' }, { label: 'kg' }, { label: 'gm' }];

  const [biltyAddStatus, setBiltyAddStatus] = useState(true);

  // / swr start

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());



  const { data, error } = useSWR(
    `${process.env.apiUrl}/lr-booking/single/${bookingNo}`,

    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  var shipmentNo = '';
  var gstNo = '';

  if (data.status === 'success') {
    const biltyDataa = data.data;
    if (biltyDataa.length > 0) {
      shipmentNo = biltyDataa[0].shipment_no;
      gstNo = biltyDataa[0].consignor_gst
    }
    else {
      gstNo = biltyDataa.consignor_gst;
      shipmentNo = '';
    }
  }

  // submit for add bilty

  const onSubmit = async (data) => {
    setFormData({
      booking_id: bookingNo,

      shipment_no: data.shipment_no,
      packages: data.packages,
      description: data.description,
      date: data.date,
      gst_no: data.gst_no,
      goods_value: data.goods_value,
      created_by: empId,
      invoice_no: data.invoice_no,
      weight: data.weight,
      unit: 'kg',
    });

    setModalData([
      { fieldName: 'Booking No', data: bookingNo },
      {
        fieldName: 'Shipment No',
        data: data.shipment_no,
      },
      { fieldName: 'No of Package ', data: data.packages },
      { fieldName: 'Date', data: data.date },
      { fieldName: 'Goods Value', data: data.goods_value },
      { fieldName: 'Invoice No', data: data.invoice_no },
      { fieldName: 'Weight', data: data.weight },
    ]);

    setModalShow(true);
    setOpen(true);
  };
  const submitForm = async () => {
    setOpen(false);
    const res = await fetch(`${process.env.apiUrl}/create-bilty`, {
      body: JSON.stringify(
        formData
      ),
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
      resetField('packages');
      resetField('description');
      resetField('date');
      resetField('gst_no');
      resetField('created_by');
      resetField('invoice_no');
      resetField('weight');
      resetField('goods_value');
      setBiltyAddStatus(false);
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });

    }
  };


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
            Generate New Bilty
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
            <BackButton url={'/loading/bilty-generate'} />
          </Box>
        </Grid>
      </Grid>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          textAlign: 'center',
          marginTop: '30px',
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          {biltyAddStatus == true ? (
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
                  <Typography
                    variant="h6"
                    style={{
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingBottom: 16,
                    }}
                  >
                    New Bilty
                  </Typography>
                  <Divider />
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
                      //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography>Shipment Number</Typography>
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
                          value={shipment_no === '' ? shipmentNo : shipment_no}
                          {...register('shipment_no', { required: true })}

                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                          onChange={(e) => setShipmentNo(e.target.value)}
                        />
                      </Box>
                    </Box>
                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography>No of Packages</Typography>
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
                          type="number"
                          {...register('packages', { required: true })}
                          onChange={(event) =>
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value
                          }
                          // onChange={(e) => setNumOfPackage(e.target.value)}
                          // value={numOfPackage}
                          placeholder="No of Packages"
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
                      <Typography>Description</Typography>
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
                          minRows={3}
                          placeholder="Enter Description"
                          {...register('description', { required: true })}
                          // onChange={(e) => setDescription(e.target.value)}
                          // value={description}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
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
                        alignItems: 'center',
                      }}
                    >
                      <Typography>Invoice Number</Typography>
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
                          {...register('invoice_no', { required: true })}
                          placeholder="Invoice Number"
                          // onChange={(e) => setInvoiceNum(e.target.value)}
                          // value={invoiceNum}
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
                        alignItems: 'center',
                      }}
                    >
                      <Typography> Date</Typography>
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
                        <OutlinedInput
                          placeholder="Invoice Number"
                          type="date"
                          {...register('date', { required: true })}
                          // onChange={(e) => setDate(e.target.value)}
                          // value={date}
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
                        alignItems: 'center',
                      }}
                    >
                      <Typography>Gstin Number</Typography>
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
                          value={gstNo}

                          {...register('gst_no', { required: false })} // onChange={(e) => setDate(e.target.value)}


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
                        alignItems: 'center',
                      }}
                    >
                      <Typography>Weight</Typography>
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
                          {...register('weight', { required: true })}
                          placeholder="Enter Weight Value"
                          type="number"
                          onChange={(event) =>
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value
                          }
                          // minRows={1}
                          // InputProps={{
                          //   inputProps: { min: 1 },
                          // }}
                          // onChange={(e) => setInvoiceNum(e.target.value)}
                          // value={invoiceNum}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                    </Box>
                    {/* <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography> Weight Standard</Typography>
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
                        <FormControl>
                        
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={weightUnit}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="ton"
                              control={<Radio />}
                              label="ton"
                            />
                            <FormControlLabel
                              value="kg"
                              control={<Radio />}
                              label="kg"
                            />
                            <FormControlLabel
                              value="gm"
                              control={<Radio />}
                              label="gm"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box> */}

                    <Box
                      style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography>Goods Value</Typography>

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
                          {...register('goods_value', { required: true })}
                          placeholder="Enter Goods Value"
                          type="number"
                          onChange={(event) =>
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value
                          }
                          // minRows={1}
                          // InputProps={{
                          //   inputProps: { min: 1 },
                          // }}
                          // onChange={(e) => setInvoiceNum(e.target.value)}
                          // value={invoiceNum}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 36,
                            borderRadius: '4px ',
                          }}
                        />
                      </Box>
                      {/* <Box
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
                      
                        placeholder="Enter Goods Value"
                        {...register('goods_value', { required: true })}
                        // onChange={(e) => setGoodsVal(e.target.value)}
                        // value={goodsVal}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px',
                        }}
                      />
                    </Box> */}
                    </Box>
                  </Box>
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
                      Add Bilty
                    </Button>
                  </Box>
                </Paper>
              </Container>
            </form>
          ) : (
            <Paper style={{ paddingTop: 50, paddingBottom: 50 }}>
              <Box alignContent={'center'} alignItems="center">
                <Typography
                  variant="h6"
                  component="h4"
                  // sx={{  }}
                  style={{
                    color: '#17a2b8',
                    marginBottom: '20px',
                    fontWeight: 'bolder',
                  }}
                >
                  You Have Successfully added !!!
                </Typography>

                <Button
                  // className="newbookingbtn"
                  variant="outlined"
                  style={{
                    background: 'green',
                    color: 'white',
                  }}
                  sx={{ paddingLeft: 20, paddingRight: 50 }}
                  onClick={() => {
                    setBiltyAddStatus(true);
                  }}
                >
                  Add Bilty
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
        <ModalConfirmation
          open={open}
          setOpen={setOpen}
          confirmationData={modalData}
          submitMethod={submitForm}
          title={'New Bilty Confirmation Details'}
        />
      </Grid>
    </div>
  );
};

export default NewBilty;
