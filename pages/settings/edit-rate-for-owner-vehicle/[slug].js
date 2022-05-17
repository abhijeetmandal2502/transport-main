import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import {
  Autocomplete,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import BreadCrumb from '../../../components/BreadCrumb';
import BackButton from '../../../components/buttons/BackButton';
//  '../../../components/buttons/BackButton';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useSession, getSession } from 'next-auth/react';

const EditRateForOwnerVehicle = (props) => {
  const router = useRouter();

  const lrId = router.query.id;

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
  const path = router.query.slug;

  const locationdata = [];

  path &&
    props.data.map((item) => {
      if (item.slug == path) {
        locationdata = item;
      }
    });

  const tempArr = path.split('_');

  const str1 = tempArr[0];
  const fromLocation = str1.charAt(0).toUpperCase() + str1.slice(1);

  const str2 = tempArr[tempArr.length - 1];
  const toLocation = str2.charAt(0).toUpperCase() + str2.slice(1);

  const onSubmit = async (data) => {
    setFormData({
      from_location: data.from_location,
      to_location: data.to_location,
      distance: locationdata.distance,
      // per_kg_amount: data.per_kg_amount,
      own_per_kg_rate: data.per_kg_amount,
      consignor: locationdata.consignor,
      vendor_per_kg_rate: locationdata.vendor_per_kg_rate,
    });

    setModalData([
      { fieldName: 'From Location', data: data.from_location },
      { fieldName: 'To Location', data: data.to_location },
      { fieldName: 'Distance', data: locationdata.distance },
      { fieldName: 'Per Kg amount', data: data.per_kg_amount },
    ]);

    setModalShow(true);
    setOpen(true);
  };

  const submitForm = async () => {
    setOpen(false);
    const session = await getSession();
    const token = session.user.access_token;
    // 

    const res = await fetch(
      `${process.env.apiUrl}/update-distance/${locationdata.id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await res.json();


    if (result.status === 'success') {
      enqueueSnackbar(result.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/settings/rate-master-for-vehicle-owner');
    } else {
      enqueueSnackbar(result.errors, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }

    // 
  };

  // 
  return (
    <div>
      <BreadCrumb id={lrId} />
      {locationdata && (
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
              Edit Rate For Owner Vehicle
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
              <BackButton url={'/settings/rate-master-for-vehicle-owner'} />
            </Box>
          </Grid>
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
                        alignItems: 'center',
                      }}
                    >
                      <Typography> From Location</Typography>
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
                          // type="number"
                          {...register('from_location', { required: true })}
                          // onChange={(e) => setNumOfPackage(e.target.value)}
                          // value={numOfPackage}
                          placeholder="from location"
                          value={locationdata.from_location}
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
                      <Typography>To Location</Typography>
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
                          // type="number"
                          {...register('to_location', { required: true })}
                          // onChange={(e) => setNumOfPackage(e.target.value)}
                          // value={numOfPackage}
                          placeholder="To location"
                          value={locationdata.to_location}
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
                      <Typography>Amount Per KG</Typography>
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
                          onChange={(event) =>
                            event.target.value < 0
                              ? (event.target.value = 0)
                              : event.target.value
                          }
                          {...register('per_kg_amount', { required: true })}
                          placeholder="weight in KG"
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

                    // onClick={() => {
                    //   
                    //     'checkshipment',
                    //     shipmentNum,
                    //     'noof package',
                    //     numOfPackage,
                    //     'desc',
                    //     description
                    //   );
                    // }}
                    >
                      Edit Bilty
                    </Button>
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
      )}
    </div>
  );
};

export default EditRateForOwnerVehicle;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session !== null && session !== undefined) {
    const token = session.user.access_token;
    // 
    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/distances/list`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const result = await res.json();
    if (result.status === 'success') {
      var data = result.data;
    } else {
      var data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
