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
  Add,
  DoubleArrow,
  Search,
  AddIcon,
  AddCircleOutline,
  RemoveCircle,
} from '@material-ui/icons';
import {
  Autocomplete,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import React, { useState } from 'react';
import BackButton from '../buttons/BackButton';
import { useSession, getSession } from 'next-auth/react';

import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const NewLocationcmpnt = () => {

  const router = useRouter()

  // get token from sesssion 
  const { data: session } = useSession()
  const token = session.user.access_token

  const [totalItem, setTotalIem] = useState(1);
  const [addLocation, setLocation] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, setValue } = useForm();

  const countArr = [];

  for (var i = 0; i < totalItem; i++) {
    countArr.push(i);
  }


  const onSubmit = async (locations) => {

    try {
      const data = await fetch(`${process.env.apiUrl}/create-location`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location_name: locations,
        }),
      });

      const res = await data.json();


      if (res.status === 'success') {
        var message = res.message;
        enqueueSnackbar(message, {
          variant: 'success',
        });

        router.push("/settings/location")

      } else {
        var message = res.errors[0];
        enqueueSnackbar(item, {
          variant: 'error',
        });
      }
    }
    catch (err) {

    }


  }

  return (
    <>
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
              New Location
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
              <BackButton url={'/settings/location'} />
            </Box>
          </Grid>
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Grid item xs={12} sm={12} md={6}>
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
                  Location{' '}
                  <Button
                    style={{
                      float: 'right',
                      fontSize: 'small',
                      background: '#008000',
                      height: '10',
                      ml: '3',
                    }}
                    onClick={() =>
                      setTotalIem(totalItem < 10 ? totalItem + 1 : 10)
                    }
                  >
                    {' '}
                    <AddCircleOutline />
                    Add
                  </Button>
                  {totalItem > 1 ? (
                    <Button
                      style={{
                        float: 'right',
                        fontSize: 'small',
                        background: 'darkred',
                        height: '10',
                        ml: '3',
                      }}
                      onClick={() =>
                        setTotalIem(totalItem > 1 ? totalItem - 1 : 1)
                      }
                    >
                      {' '}
                      <RemoveCircle />
                      Remove
                    </Button>
                  ) : null}
                </Typography>

                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    style={{
                      display: 'block',
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                      paddingBottom: 16,
                    }}
                  >
                    {countArr.map((item, key) => {
                      return (
                        <Box
                          style={{
                            marginBottom: 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}
                          key={key}
                        >
                          {' '}
                          <Typography>Location Name</Typography>
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
                              placeholder="Enter Location Name"
                              style={{
                                width: '-webkit-fill-available',
                                paddingLeft: 5,
                                height: 36,
                                borderRadius: '4px  ',
                              }}
                              // onChange={(e) => }
                              {...register('item' + item, { required: true })}
                            />
                          </Box>
                        </Box>
                      );
                    })}

                    <Box style={{ textAlign: 'end', marginTop: '10px' }}>
                      <Button
                        type="submit"
                        className="newbookingbtn"
                        variant="outlined"
                        style={{ background: 'green', color: 'white' }}
                      >
                        Add Location
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewLocationcmpnt;

