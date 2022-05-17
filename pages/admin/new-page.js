import { Divider } from '@material-ui/core';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';

import BackButton from '../../components/buttons/BackButton';
import DatePickers from '../../components/DatePickers';
import BreadCrumb from '../../components/BreadCrumb';

import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import ModalConfirmation from '../../components/ModalConfirmation';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const NewPage = () => {
  const top100Films = [
    'Vendor',
    'Petrolpump',
    'Login',
    'Vendor',
    'Petrolpump',
    'Login',
  ];
  const fixedOptions = [top100Films[6]];
  const [value, setValue] = React.useState([...fixedOptions, top100Films[13]]);

  const [modalDataForPage, setModalDataForPage] = useState([]);
  const [modalDataForMenu, setModalDataForMenu] = useState([]);
  const [modalShowForPage, setModalShowForPage] = useState(false);
  const [modalShowForMenu, setModalShowForMenu] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [formDataForPage, setFormDataForPage] = useState('');
  const [formDataForMenu, setFormDataForMenu] = useState('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session && session.user.access_token;
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // start

  // submit

  const onSubmitForPage = async (data) => {
    // 
    setFormDataForPage({
      name: data.page_name,
      url: data.page_url,
    });

    setModalDataForPage([
      { fieldName: 'Page Name', data: data.page_name },
      { fieldName: 'Page Url', data: data.page_url },
    ]);

    setModalShowForPage(true);
    setOpenPage(true);
  };

  const submitFormForPage = async () => {
    setOpenPage(false);


    const res = await fetch(`${process.env.apiUrl}/access-pages`, {
      body: JSON.stringify(formDataForPage),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });

    const result = await res.json();

    if (result.status === 'success') {
      var message = result.message;
      // router.push('/');
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      resetField('name');
      resetField('url');

      // router.push('/');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const onSubmitForMenu = async (data) => {
    // 
    setFormDataForMenu({
      parent_title: data.parent,
      page_title: data.menu_title,
      page_slug: data.menu_url,
    });

    setModalDataForMenu([
      { fieldName: 'Parent Menu', data: data.parent },
      {
        fieldName: 'Menu Name',
        data: data.menu_title,
      },
      { fieldName: 'Menu Url', data: data.menu_url },
    ]);

    setModalShowForMenu(true);
    setOpenMenu(true);
  };
  const submitFormForMenu = async () => {
    setOpenMenu(false);
    const res = await fetch(`${process.env.apiUrl}/create-page`, {
      body: JSON.stringify(formDataForMenu),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });

    const result = await res.json();


    if (result.status === 'success') {
      var message = result.message;
      // router.push('/');
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      resetField('parent');
      resetField('menu_title');
      resetField('menu_url');

      // router.push('/');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  // end
  return (
    <div>
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
            Add New Page
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
            <BackButton url="" />
          </Box>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmitForPage)}>
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
                    // fontWeight: 'bold',
                  }}
                >
                  Add New Access Page
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
                      justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography>Page Name</Typography>
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
                        placeholder="Enter Page Name"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('page_name', { required: false })}
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
                    <Typography>Page Url</Typography>
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
                        placeholder="Enter Page Url"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('page_url', { required: false })}
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
      <form onSubmit={handleSubmit(onSubmitForMenu)}>
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
                  style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                    // fontWeight: 'bold',
                  }}
                >
                  Add New Menu
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
                      justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    {' '}
                    <Typography>Parent</Typography>
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
                        placeholder="Enter Parent Name"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('parent', { required: false })}
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
                    <Typography>Menu Title</Typography>
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
                        placeholder="Enter Menu Title"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('menu_title', { required: false })}
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
                    <Typography>Menu Url</Typography>
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
                        placeholder="Enter Menu Url"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('menu_url', { required: false })}
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
      <ModalConfirmation
        open={openMenu}
        setOpen={setOpenMenu}
        confirmationData={modalDataForMenu}
        submitMethod={submitFormForMenu}
        title={'Menu Confirmation Details'}
      />
      <ModalConfirmation
        open={openPage}
        setOpen={setOpenPage}
        confirmationData={modalDataForPage}
        submitMethod={submitFormForPage}
        title={'Page Confirmation Details'}
      />
    </div>
  );
};

export default NewPage;
