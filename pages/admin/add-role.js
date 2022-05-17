import { Divider } from '@material-ui/core';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  MenuItem,
  Select,
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

const AddRole = () => {
  // const top100Films = [
  //   'Vendor',
  //   'Petrolpump',
  //   'Login',
  //   'Vendor',
  //   'Petrolpump',
  //   'Login',
  // ];
  // const fixedOptions = [top100Films[6]];
  // const [value, setValue] = React.useState([...fixedOptions, top100Films[13]]);
  // for modal

  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');

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
  const [choosePage, setChoosePage] = useState([]);
  const [chooseMenu, setChooseMenu] = useState([]);
  const [chooseMenuSlug, setChooseMenuSlug] = useState([]);
  const [choosePageSlug, setChoosePageSlug] = useState([]);
  var pageSlugArr = [];
  var menuSlugArr = [];
  // / swr start

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());

  // 

  // const { data: roles, error: rolesError } = useSWR(
  //   `${process.env.apiUrl}/roles`,
  //   fetcher
  // );
  const { data: pages, error: pagesError } = useSWR(
    `${process.env.apiUrl}/access-pages`,
    fetcher
  );

  const { data: menus, error: menusError } = useSWR(
    `${process.env.apiUrl}/pages`,
    fetcher
  );

  if (pagesError || menusError) return <div>Failed to load</div>;

  if (!pages || !menus) return <div>Loading...</div>;



  var pageList = [];
  var menuList = [];

  if (pages.status === 'success') {

    pages.data.map((item) => {
      pageList.push({ title: item.name, slug: item.page_id });
    });
  } else {
    pageList = [];
  }

  if (menus.status === 'success') {
    menus.data.map((item) => {
      menuList.push({ title: item.page_title, slug: item.page_slug });
    });
  } else {
    var menuList = [];
  }
  // }

  // end
  const choosePageMethod = (event, value) => {
    value.map((item, i) => {
      pageList.map((page) => {
        if (page.title == value[i]) {
          pageSlugArr.push(page.slug);
        }
      });
    });
    setChoosePageSlug(pageSlugArr);

    setChoosePage(value);
  };

  const chooseMenuMethod = (event, value) => {
    value.map((item, i) => {
      menuList.map((menu) => {
        if (menu.title == value[i]) {
          menuSlugArr.push(menu.slug);
        }
      });
    });

    setChooseMenuSlug(menuSlugArr);
    // 

    setChooseMenu(value);
  };
  // submit

  const onSubmit = async (data) => {
    // 
    setFormData({
      role_name: data.role_name,
      access_pages: JSON.stringify(
        chooseMenuSlug.map((menu, i) => {
          return `${menu}  ${i == chooseMenuSlug.length - 1 ? '' : ','}`;
        })
      ),
      internal_access: JSON.stringify(
        choosePageSlug.map((menu, i) => {
          return `${menu}  ${i == choosePageSlug.length - 1 ? '' : ','}`;
        })
      ),
    });

    setModalData([
      { fieldName: 'Role Name', data: data.role_name },
      {
        fieldName: 'Menu',
        data: chooseMenu.map((menu, i) => {
          return `${menu}  ${i == chooseMenu.length - 1 ? '' : ','}`;
        }),
        // [chooseMenu],
      },
      {
        fieldName: 'Page Access',
        data: choosePage.map((page, i) => {
          return `${page}  ${i == choosePage.length - 1 ? '' : ','}`;
        }),
        // [choosePage],
      },
    ]);

    setModalShow(true);
    setOpen(true);
  };
  const submitForm = async () => {
    setOpen(false);
    const res = await fetch(`${process.env.apiUrl}/create-role`, {
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
      router.push('/');
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  // end variable

  return (
    <div>
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
            Add New Role
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
            <BackButton url={'/admin/role-management'} />
          </Box>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  }}
                >
                  Role Details
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
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Role Name</Typography>
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
                        placeholder="Enter Role  Name"
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 42,
                          borderRadius: '4px ',
                        }}
                        {...register('role_name', { required: true })}
                      />
                    </Box>
                  </Box>
                  <Box
                    //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <Typography>Menu</Typography>
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
                        fullWidth
                        multiple
                        id="tags-standard"
                        options={menuList.map((item) => {
                          return item.title;
                        })}
                        onChange={chooseMenuMethod}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Choose Menus"
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
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <Typography>Access Page</Typography>
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
                        fullWidth
                        multiple
                        id="tags-standard"
                        options={pageList.map((item) => {
                          return item.title;
                        })}
                        onChange={choosePageMethod}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Choose Pages"
                          />
                        )}
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
        open={open}
        setOpen={setOpen}
        confirmationData={modalData}
        submitMethod={submitForm}
        title={'User Registration Confirmation Details'}
      />
    </div>
  );
};

export default AddRole;