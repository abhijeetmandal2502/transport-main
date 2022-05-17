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
import AddVehiclePrice from "../../components/settings/AddVehiclePrice"

const AddLocationMappingcmpnt = (props) => {
  // get token from session
  const { data: session } = useSession();
  const token = session.user.access_token;

  const { data } = props;
  const locations = data.locations;
  const vendorList = data.vendorList;
  const [showMapping, setShowmapping] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [vendor, setVendor] = useState('');




  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, setValue } = useForm();

  const [km, setKm] = useState(0);

  const addlocmapping = [];

  locations.map((item) => {
    addlocmapping.push({ label: item.location });
  });

  const vendors = [];
  vendorList.map((item) => {
    vendors.push({ label: item.name });
  });



  const [taPrice, setTaPrice] = useState('');
  return (
    <>
      {showMapping === false ? <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
              >
                Location Mapping
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
                  style={{
                    marginBottom: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <Typography>Vendor Name</Typography>
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
                      options={vendors}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select"
                        />
                      )}
                      onChange={(e, value) => setVendor(value.label)}
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
                  <Typography>From</Typography>
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
                      options={addlocmapping}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select"
                        />
                      )}
                      onChange={(e, value) => setFrom(value.label)}
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
                  <Typography>To</Typography>
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
                      options={addlocmapping}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select"
                        />
                      )}
                      onChange={(e, value) => setTo(value.label)}
                    />
                  </Box>
                </Box>
                <Box></Box>
                <Box style={{ textAlign: 'end', marginTop: '15px' }}>
                  <Button
                    onClick={() => setShowmapping(!showMapping)}
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
              </Box>

            </Paper>

          </Container>
        </Grid>
      </Grid> :
        <AddVehiclePrice to={to} from={from} vendor={vendor} />
      }

    </>
  );
};

export default AddLocationMappingcmpnt;
