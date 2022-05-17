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
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import { state, country } from '../../components/Utils';
import { useSession, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import BackButton from '../../components/buttons/BackButton'
import { useRouter } from 'next/router';

const VendorRegistration = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // get token from session storage
  const { data: session } = useSession();
  const token = session.user.access_token;

  const location = data.location;
  const vendors = data.vendors;
  // active vendor list for autocomplete process
  const vendorList = [];
  vendors.map((item) => {
    vendorList.push({ label: item.name });
  });

  // active location list for autocomplete process
  const locations = [];
  location.map((loc) => {
    locations.push({ label: loc.location });
  });

  // react hook form validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (fromData) => {
    // 

    // submit to api call
    const req = await fetch(`${process.env.apiUrl}/create-consignor`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        consignor: fromData.vendorName,
        name: fromData.plantName,
        mobile: fromData.mobile,
        gst_no: fromData.gst,
        location: fromData.location,
        address: fromData.address,
        country: fromData.country,
        state: fromData.state,
        city: fromData.city,
        pin_code: fromData.pincode,
        email: fromData.email,
      }),
    });

    const res = await req.json();


    if (res.status === 'success') {
      enqueueSnackbar(res.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/settings/vendors-list');
    } else {
      enqueueSnackbar(res.errors, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {' '}
      <BreadCrumb />

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
            Add Sub Vendor Details
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
            <BackButton url={'/settings/vendors-list'} />
          </Box>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Box
            style={{
              marginBottom: 4,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          ></Box>
        </Grid>
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={12} sm={12} md={6}>
          {' '}
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
                style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
              >
                Vendor Details
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
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>Main Vendor</Typography>
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
                      options={vendorList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Main Vendor List"
                          {...register('vendorName', { required: true })}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box
                  //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Sub Plant</Typography>
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
                      placeholder="Sub Plant Name"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('plantName', { required: true })}
                    />
                  </Box>
                </Box>

                <Box
                  //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'baseline',
                  }}
                >
                  {' '}
                  <Typography>Email Id</Typography>
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
                      placeholder="Email Id"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('email', { required: true })}
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
                  <Typography>Phone No</Typography>
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
                      type="number"
                      placeholder="Mobile No"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('mobile', { required: true })}
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    alignItems: 'center',
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>Address</Typography>
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
                      //   className="autocomp1"
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Enter Address"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        // height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('address', { required: true })}
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    alignItems: 'center',
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>Plant Location</Typography>
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
                      options={locations}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Plant Location"
                          {...register('location', { required: true })}
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
                  <Typography>GST No</Typography>
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
                      placeholder="GST No"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('gst', { required: true })}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    alignItems: 'center',
                    marginBottom: 8,
                    // display: { xs: "block", sm: "flex", md: "flex" },
                    display: 'flex',
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>Country</Typography>
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
                      options={country}
                      //   defaultValue="Nepal"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Country"
                          {...register('country', { required: true })}
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
                  <Typography>City</Typography>
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
                      placeholder="City"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px',
                      }}
                      {...register('city', { required: true })}
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    alignItems: 'center',
                    marginBottom: 8,
                    // display: { xs: "block", sm: "flex", md: "flex" },
                    display: 'flex',
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>State</Typography>
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
                      options={state}
                      //   defaultValue="Nepal"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select State"
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
                  <Typography>Pin Code No</Typography>
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
                      type="number"
                      placeholder="Pin Code No"
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 36,
                        borderRadius: '4px ',
                      }}
                      {...register('pincode', { required: true })}
                    />
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                style={{
                  paddingTop: 16,
                  marginRight: 16,
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Button
                  variant="outlined"
                  style={{ background: '#28a745', color: 'white' }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </form>
  );
};

export default VendorRegistration;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  var data = []
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/vendors`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    var vendors = [];
    if (response.status == 'success') {
      vendors = response.data;
    }

    // fetch all distance that is availabel for mapping
    const distanceData = await fetch(`${process.env.apiUrl}/locations`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const distance = await distanceData.json();
    if (distance.status === 'success') {
      var dist = distance.data;
    } else {
      var dist = [];
    }

    data = {
      vendors: vendors,
      location: dist,
    };
  } else {
    data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
