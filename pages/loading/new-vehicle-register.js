import React from 'react';
import { useState } from 'react';
import {
  Autocomplete,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  OutlinedInput,
  Paper,
  TextareaAutosize,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add } from '@material-ui/icons';

import { Box } from '@mui/system';
import BackButton from '../../components/buttons/BackButton';
import { state, country } from '../../components/Utils';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';

const NewVehicleRegister = ({ vehicleType }) => {

  const router = useRouter();
  const [mobile, setMobile] = useState('');

  // get token from session data
  const { data: session } = useSession();
  const token = session.user.access_token;

  const url = '/loading/vehicle-register';
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showOwner, setShowOwner] = useState(false);
  const [vehileOwnership, setVehicleOwnership] = useState('');

  const vehicleOwner = (e) => {
    setVehicleOwnership(e.target.value);

    if (e.target.value === 'third-party') {
      setShowOwner(true);
    } else {
      setShowOwner(false);
    }
  };
  const checkMobile = (e) => {
    var result = new RegExp('([0-9])$');
    if (result.test(e)) {
      if (e.split('').length <= 10) {
        setMobile(e);
      }
    }
    if (e === '') {
      setMobile('');
    }
  };

  const onSubmit = async (data) => {
    var ownerDetails = JSON.stringify({});
    if (data.vehicle_ownership === 'third-party') {
      ownerDetails = JSON.stringify([
        {
          broker_mobile: data.broker_mobile,
          broker_name: data.broker_name,
          broker_address: data.broker_address,
        },
      ]);
    }

    const res = await fetch(`${process.env.apiUrl}/create-vehicle`, {
      body: JSON.stringify({
        vehicle_no: data.vehicle_no,
        type: data.vehicle_type,
        ownership: data.vehicle_ownership,
        vehicle_details: data.details,
        state: data.state,
        owner_details: ownerDetails,
        created_by: 'honey',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });
    const result = await res.json();

    if (result.status === 'success') {
      var message = result.message;
      enqueueSnackbar(message, {
        variant: 'success',
      });
      router.push(url);
      resetField(
        'vehicle_no',
        'vehicle_type',
        'vehicle_ownership',
        'details',
        'state',
        'ownerDetails'
      );
    } else {
      var message = result.errors[0];
      result.errors.map((item) => {
        enqueueSnackbar(item, { variant: 'error' });
      });

    }
  };

  return (
    <>
      <BreadCrumb />

      <Grid container style={{ marginBottom: 15 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            New Vehicle Registration
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <BackButton url={url} />
          </Box>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{ width: '100%', overflow: 'hidden' }}
              style={{ paddingBottom: 16, paddingTop: 16 }}
              elevation={4}
            >
              <Typography
                variant="h6"
                style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
              >
                Vehicle Information
              </Typography>
              <Divider />
              <Box
                style={{
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
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Vehicle Ownership</Typography>
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Vehicle Ownership
                      </InputLabel>
                      <Select
                        {...register('vehicle_ownership')}
                        label="Vehicle Ownership"
                        value={vehileOwnership}
                        onChange={vehicleOwner}
                      >
                        <MenuItem value="owned">Owned</MenuItem>
                        <MenuItem value="third-party">Third Party</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Vehicle No</Typography>
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
                    {' '}
                    <OutlinedInput
                      placeholder="Enter Vehicle No"
                      inputProps={{ style: { textTransform: 'uppercase' } }}
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('vehicle_no', { required: true })}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>State</Typography>
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
                    <Autocomplete
                      style={{ width: '100%' }}
                      disablePortal
                      className="autocomp1"
                      id="combo-box-demo"
                      options={state}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="--Select--"
                          {...register('state', { required: true })}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Vehicle Details</Typography>
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
                    {' '}
                    <OutlinedInput
                      placeholder="Enter Detail"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px',
                      }}
                      {...register('details', { required: false })}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Vehicle Type</Typography>
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Vehicle Type
                      </InputLabel>
                      <Select
                        {...register('vehicle_type')}
                        label="Vehicle Type"

                      >
                        {
                          vehicleType.map((item, i) => {

                            return (
                              <MenuItem value={item.type_id} key={i} >{item.type_name}</MenuItem>
                            )
                          })
                        }

                        {/* <MenuItem value="third-party">Third Party</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                style={{ paddingTop: 16 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  type="submit"
                  className="newbookingbtn"
                  variant="outlined"
                  style={{
                    marginRight: 10,
                    background: 'green',
                    color: 'white',
                  }}
                >
                  <Add style={{ fontSize: '20px' }} /> Save Vehicle Registration
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {showOwner == true ? (
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
                  Owner/Broker Information
                </Typography>
                <Divider />
                <Box
                  style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}
                >
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    {' '}
                    <Typography>Name</Typography>
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
                      {' '}
                      <OutlinedInput
                        placeholder="Enter Name"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px  ',
                        }}
                        {...register('broker_name', { required: true })}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    {' '}
                    <Typography>Address</Typography>
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
                      {' '}
                      <TextareaAutosize
                        placeholder="Enter Address"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 50,
                          borderRadius: '4px  ',
                        }}
                        {...register('broker_address', { required: true })}
                      />
                    </Box>
                  </Box>
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    {' '}
                    <Typography>Contact No</Typography>
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
                      {' '}
                      <OutlinedInput
                        placeholder="Enter Mobile No."
                        value={mobile}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 30,
                          borderRadius: '4px 0px 0px 4px',
                        }}
                        {...register('broker_mobile', { required: true })}
                        onChange={(e) => checkMobile(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewVehicleRegister;

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const session = await getSession(ctx);
  var vehicleType = [];
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    const req = await fetch(`${process.env.apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();

    if (res.status === 'success') {
      var vehicleType = res.data;
    } else {
      var vehicleType = [];
    }

  }

  // Pass data to the page via props
  return { props: { vehicleType } };
}
