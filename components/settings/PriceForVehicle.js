import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Add, DoubleArrow, Search } from '@material-ui/icons';
import {
  Autocomplete,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const PriceForVehicle = (props) => {
  const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];

  const [taPrice, setTaPrice] = useState('');
  return (
    <>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 20,
        }}
      >
        <Grid item xs={12} sm={12} md={10}>
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
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textShadow: 'rgb(207 207 207 / 63%) 2px 2px',
                }}
              >
                Set Price List For Vehicle
              </Typography>
              <Divider />

              <form>
                <Box
                  style={{
                    display: 'block',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                    paddingBottom: 16,
                    // paddingBottom: 16,
                  }}
                >
                  <Box
                    style={{
                      //   marginBottom: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      style={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'start',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontSize: 'large',
                        }}
                      >
                        Vehicle Type
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        Owner Price
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        TA Price
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        From
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>To</Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box
                  style={{
                    display: 'block',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  }}
                >
                  <Box
                    style={{
                      marginBottom: 16,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      style={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'start',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: 14,
                        }}
                      >
                        Type A
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <OutlinedInput
                        className="textbox"
                        style={{ height: 26, width: '60%', fontSize: 14 }}
                        placeholder="Enter Price"
                      />
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <OutlinedInput
                        className="textbox"
                        style={{ height: 26, width: '60%', fontSize: 14 }}
                        placeholder="Enter Price"
                      />
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Sitarganj
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Haldwani
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box
                  style={{
                    display: 'block',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 16,
                  }}
                >
                  <Box
                    style={{
                      marginBottom: 16,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      style={{
                        width: '20%',
                        display: 'flex',
                        alignItems: 'start',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: 14,
                        }}
                      >
                        Type A
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <OutlinedInput
                        className="textbox"
                        style={{ height: 26, width: '60%', fontSize: 14 }}
                        placeholder="Enter Price"
                      />
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <OutlinedInput
                        className="textbox"
                        style={{ height: 26, width: '60%', fontSize: 14 }}
                        placeholder="Enter Price"
                      />
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Sitarganj
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        width: '20%',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginLeft: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                        Haldwani
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Box
                  style={{
                    textAlign: 'center',
                    marginTop: '15px',
                  }}
                >
                  <Button
                    type="submit"
                    className="newbookingbtn"
                    variant="outlined"
                    style={{
                      background: 'green',
                      color: 'white',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    Update Vehicle Price
                  </Button>
                </Box>
              </form>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default PriceForVehicle;
