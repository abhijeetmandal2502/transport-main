import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  OutlinedInput,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Add,
  ArrowBackRounded,
  DoubleArrow,
  Router,
  ShoppingBasket,
  ShoppingCart,
  Visibility,
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import DatePickers from '../DatePickers';
import { useSnackbar } from 'notistack';
import ModalConfirmation from '../ModalConfirmation';
import { useSession, getSession } from 'next-auth/react';
import BackButton from '../buttons/BackButton';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewBooking = (props) => {
  // get token from session
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const token = session.user.access_token;
  const [count, setCount] = useState(1);

  // array is user for display second paper multiple time
  const looping = [];
  for (var i = 0; i < count; i++) {
    looping.push(i);
  }

  const router = useRouter();
  const [dataDetails, setDatadetails] = useState([]);
  const [consignee, setConsignee] = useState([]);
  const [consignor, setConsignor] = useState([]);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [bookingDate, setBookingDate] = useState([]);
  const [indentDate, setIndentDate] = useState([]);
  const [confirmBtn, setConfirmbtn] = useState(false);
  const [subAddress, setSubAddress] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [destination, setDestination] = useState([]);
  const [origin, setOrigin] = useState([]);

  // use swr for fetch data at the state change time of consignee
  useEffect(() => {
    if (Object.keys(consignor).length > 0) {
      fetchData();
    }
  }, [consignor]);

  const fetchData = async () => {
    const req = await fetch(
      `${process.env.apiUrl}/distances/${consignor.key}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();



    if (res.status === 'success') {
      const destinaton = [];
      for (var key in res.data) {
        res.data[key].map((data, i) => {
          destinaton.push({ label: data.to_location, key: i });
        });
      }
      const originData = [{ label: key, key: 1 }];
      setDestination(destinaton);
      setOrigin(originData);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // call form submit for display total data used for booking

  const onSubmit = (data) => {


    var tempData = [
      { fieldName: 'consignee (Sender)', data: consignee.name },
      { fieldName: 'consignor (Reciever)', data: consignor.name },
      { fieldName: 'Origin (From)', data: fromLocation },
      { fieldName: 'Destination (To)', data: toLocation },
    ];
    var tempIndentDate = [];
    var tempBookingDate = [];
    for (var i = 0; i < data.indentDate.length; i++) {
      var bookingDate = data.bookingDate[i];
      var indentDate = data.indentDate[i];
      if (count > i) {
        tempData.push({ fieldName: 'Booking Date', data: bookingDate }, { fieldName: 'Indent Date', data: indentDate })
        tempIndentDate.push(indentDate);
        tempBookingDate.push(bookingDate);
      }

    }

    setDatadetails(tempData);
    setIndentDate(tempIndentDate);
    setBookingDate(tempBookingDate);

    handleOpen();
  }


  const consignorDetails = [];

  props.consigneeData.map((item) => {
    const consignorName = capitalize(item.consignor.replace(/_/gi, ' '));

    var tempArr = {
      label: consignorName + ' / ' + capitalize(item.name),
      key: item.cons_id,
    };

    consignorDetails.push(tempArr);
  });

  const address = [];

  // send request to api
  const submitForm = async () => {
    let formData = {
      consignor: consignor.key,
      consignee: consignee.key,
      reporting_date: bookingDate,
      indent_date: indentDate,
      from_location: fromLocation,
      destination_location: toLocation,
    };

    const req = await fetch(`${process.env.apiUrl}/create-lr-booking`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const res = await req.json();

    if (res.status === 'success') {
      const lrNumber = res.lr_no;
      var message = res.message;

      var key = enqueueSnackbar(message, {
        variant: 'success',
      });
      router.push('/booking/lr-booking');
    } else {
      enqueueSnackbar(res.errors, {
        variant: 'error',
      });
    }

    // alert(message);
    handleClose();
  };

  // function for capitalize word
  function capitalize(word) {
    return word
      .toLowerCase()
      .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container
        maxWidth="md"
        style={{
          maxWidth: 1080,
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >

        <Grid container style={{ marginBottom: 15 }} >
          <Grid
            item
            xs={12} sm={8}
            style={{
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: { sx: 'block', sm: 'flex' },
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{ fontWeight: 'bold' }}
                style={{ marginRight: 5 }}
              >
                New Booking
              </Typography>
              <Typography
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  width: 'fit-content',
                  paddingLeft: 3,
                  paddingRight: 3,
                  paddingTop: 2,

                  lineHeight: 'normal',
                  borderRadius: 4,
                  height: 'fit-content',
                  // marginLeft: 3,
                  // marginRight: 3,
                  fontWeight: '700',
                  fontSize: 16,
                }}
                variant="h6"
                component="h4"
                sx={{
                  fontWeight: 'bold',
                }}
              >
                EXCLUSIVE TAX SALE
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Grid container sx={{ justifyContent: { xs: 'space-around', sm: 'flex-end' }, mt: { xs: '10px', sm: '0px' } }} >
              <Grid item xs={4} md={3}
                sx={{ textAlign: { xs: 'center', sm: 'end' } }}
              >

                <Button
                  className="newbookingbtn"
                  variant="outlined"
                  style={{ background: '#17a2b8', color: 'white' }}
                  onClick={() => setCount(count + 1)}
                > Add
                </Button>

              </Grid>
              <Grid item xs={4} md={3} sx={{ textAlign: { xs: 'center', sm: 'end' } }}  >

                <Button
                  className="newbookingbtn"
                  variant="outlined"
                  style={{ background: '#17a2b8', color: 'white' }}
                  onClick={() => setCount(count > 1 ? count - 1 : 1)}
                >
                  Remove
                </Button>

              </Grid>
              <Grid item xs={4} md={3}>
                <Box sx={{ textAlign: { xs: 'center', sm: 'end' } }}>
                  <BackButton url={'/booking/lr-booking'} />
                </Box>
              </Grid>

            </Grid>


          </Grid>
        </Grid>
        {/* paper first */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={4}>
          <Grid
            container
            spacing={4}
            style={{ padding: 16, display: { sm: 'block', md: 'flex' } }}
          >
            {/* grid1 */}
            <Grid item xs={12} md={6} sm={6} style={{}}>
              <Box style={{ marginBottom: 4 }}>
                <Typography style={{ fontWeight: 'bolder' }}>
                  Consignor/Sender
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'space-between',
                }}
              >
                <Autocomplete
                  className="removepadding"
                  style={{ width: '100%', height: '10px !important' }}
                  disablePortal
                  id="combo-box-demo trisha "
                  options={consignorDetails}
                  renderInput={(params) => (
                    <TextField {...params} placeholder='consignor details' {...register("consignor", { required: true })} />
                  )}
                  onChange={(event, value) =>
                    value != null &&
                    setConsignor({
                      key: value != null ? value.key : '',
                      name: value != null ? value.label : '',
                    })
                  }
                />
              </Box>
            </Grid>
            {/* grid 2 */}

            <Grid item xs={12} md={6} sm={6} style={{}}>
              <Box style={{ marginBottom: 4 }}>
                <Typography style={{ fontWeight: 'bolder' }}>
                  Consignee/Receiver
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'space-between',
                }}
              >
                <Autocomplete
                  className="removepadding"
                  style={{ width: '100%' }}
                  disablePortal
                  id="combo-box-demo"
                  options={consignorDetails}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Consignee" {...register("consignee", { required: true })} />
                  )}
                  onChange={(event, value) =>
                    value != null &&
                    setConsignee({
                      key: value != null && value.key,
                      name: value != null && value.label,
                    })
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
        {/* paper second */}

        {
          looping.map((loop) => <Paper
            sx={{ width: '100%', overflow: 'hidden' }}
            style={{ marginTop: 30 }}
            elevation={4}
            key={loop}
          >
            <Grid container spacing={4} style={{ padding: 16 }}>
              {/* second p first grid */}
              <Grid item xs={12} md={3} sm={6} style={{}}>
                <Box style={{ marginBottom: 4 }}>
                  <Typography style={{ fontWeight: 'bolder' }}>
                    Origin(From)
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}
                >
                  <Autocomplete
                    className="removepadding"
                    style={{ width: '100%' }}
                    value={fromLocation != '' ? fromLocation : ''}
                    id="combo-box-demo"

                    options={origin}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="From" {...register("fromLocation", { required: true })} />
                    )}
                    onChange={(event, value) => {
                      setFromLocation(value != null && value.label);
                    }}
                  />
                </Box>
              </Grid>

              {/* scnd p scnd grid */}

              <Grid item xs={12} md={3} sm={6} >
                <Box style={{ marginBottom: 4 }}>
                  <Typography style={{ fontWeight: 'bolder' }}>
                    Destination(To)
                  </Typography>
                </Box>
                <Box
                  className='padremove'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}
                >
                  <Autocomplete
                    className="removepadding"
                    style={{ width: '100%' }}
                    disablePortal
                    id="combo-box-demo"
                    value={toLocation != '' ? toLocation : ''}
                    options={destination}
                    renderInput={(params) => (
                      <TextField sx={{ padding: 3 }} {...params} placeholder="To" {...register("toLocation", { required: true })} />
                    )}
                    onChange={(event, value) =>
                      setToLocation(value != null && value.label)
                    }
                  />
                  {/* <Add className="addcontrol" sx={{ px: 4 }} /> */}
                </Box>
              </Grid>

              {/* second p fifth grid */}
              <Grid item xs={12} md={3} sm={6} style={{}}>
                <Box style={{ marginBottom: 4 }}>
                  <Typography style={{ fontWeight: 'bolder' }}>
                    Booking Date
                  </Typography>
                </Box>
                <Box
                  className="bookngdte padremove"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    style={{ width: '100%', padding: '0px' }}
                    type="date"
                    {...register(`bookingDate[${loop}]`, { required: true })}
                  />
                </Box>
              </Grid>

              {/* second p fifth grid */}
              <Grid item xs={12} md={3} sm={6} style={{}}>
                <Box style={{ marginBottom: 4 }}>
                  <Typography style={{ fontWeight: 'bolder' }}>
                    Indent Date
                  </Typography>
                </Box>
                <Box
                  className="bookngdte padremove"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'space-between',
                  }}
                >
                  {/* <DatePickers date={setIndesntDate} /> */}
                  <TextField
                    style={{ width: '100%', padding: ' 7.5px 14px' }}
                    type="date"
                    {...register(`indentDate[${loop}]`, { required: true })}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          )
        }


        <Box sx={{ p: '10px', textAlign: 'end', marginTop: '20px' }}>
          <Button
            variant="outlined"
            type="submit"
            style={{
              color: 'white',
              borderColor: '17a2b8',
              background: '#17a2b8',
            }}
          >
            Submit
          </Button>
        </Box>
        {/* modal portion for confirmation */}

        <ModalConfirmation
          open={open}
          setOpen={setOpen}
          confirmationData={dataDetails}
          submitMethod={submitForm}
          title={'Confirmation data for Generate LR'}
        />

        {/* end of modal portion for confirmation  */}
      </Container>
    </form>
  );
};

export default NewBooking;
