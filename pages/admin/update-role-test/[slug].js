import { Divider, TextareaAutosize } from '@material-ui/core';
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
import BackButton from '../../../components/buttons/BackButton';
import DatePickers from '../../../components/DatePickers';
import BreadCrumb from '../../../components/BreadCrumb';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { fetchData } from 'next-auth/client/_utils';
import { useEffect } from 'react';
import { Cancel } from '@material-ui/icons';

const UpdateRole = ({ data }) => {
  const [menuList, setMenuList] = useState(data.menuAccess);
  const [pageList, setPageList] = useState(data.pageAccess);
  const [assignedPage, setAssignedPage] = useState([]);
  const [assignedMenu, setAssignedMenu] = useState([]);

  const router = useRouter();
  const slug = router.query.slug;
  const { data: session, status } = useSession();
  const token = session && session.user.access_token;



  // if data is available then store data in menu list and page list

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    // const req = await fetch(`${process.env.apiUrl}/all-roles/${slug}`);
    // const res = await req.json();
    // if (res.status === 'success') {
    // }
    // else {
    // }
  };

  const choseMenu = (value) => {
    // var tempArr = assignedMenu;
    // alert(value.key)

    if (!assignedMenu.includes(value.key)) {
      setAssignedMenu([...assignedMenu, value.key]);
    }
  };

  const pageAccessFun = (value) => {
    if (!assignedPage.includes(value.key)) {
      setAssignedPage([...assignedPage, value.key]);
    }
  };



  return (
    <div>
      {' '}
      {/* <BreadCrumb /> */}
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
            Update Role
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
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Grid item xs={6} sm={6} md={6}>
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
                    // {...register('role_name', { required: true })}
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
                      options={menuList}
                      onChange={(event, value) => choseMenu(value)}
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
                      options={pageList}
                      onChange={(event, value) => pageAccessFun(value)}
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

        <Grid item xs={6} sm={6} md={6}>
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
                  //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    // alignItems: 'ce  nter',
                  }}
                >
                  {' '}
                  <Typography>Menu Assigned</Typography>
                  <Box
                    style={{
                      width: '60%',
                      display: 'flex',
                      alignItems: 'start',
                      borderRadius: 5,
                      justifyContent: 'flex-startound',
                      marginLeft: 10,
                      border: '1px solid #c7c7c7',
                      padding: 16,
                      flexWrap: 'wrap',
                    }}
                  >
                    {menuList.map((item) => {
                      if (assignedMenu.includes(item.key)) {
                        return (
                          <Typography
                            style={{
                              border: '1px solid lightgray',
                              paddingLeft: 10,
                              paddingTop: 3,
                              paddingBottom: 3,
                              paddingRight: 10,
                              borderRadius: 25,
                              marginBottom: 5,
                              display: 'flex',
                              fontSize: 13,
                              marginRight: 4,
                            }}
                          >
                            {' '}
                            {item.label}.
                            <Cancel
                              style={{ color: 'darkred', fontSize: 14 }}
                            />
                          </Typography>
                        );
                      }
                    })}
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
                  <Typography>Page Can Access</Typography>
                  <Box
                    style={{
                      width: '60%',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                      marginLeft: 10,
                      flexWrap: 'wrap',
                    }}
                  >
                    {pageList.map((item) => {
                      if (assignedPage.includes(item.key)) {
                        return <Typography>{item.label} </Typography>;
                      }
                    })}
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
      {/* </form> */}
    </div>
    // null
  );
};

export default UpdateRole;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  var data = {
    pageAccess: [],
    menuAccess: [],
  };
  var pageAccess = [];
  var menuAccess = [];
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    const req = await fetch(`${process.env.apiUrl}/access-pages`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    if (res.status == 'success') {
      res.data.map((item) => {
        pageAccess.push({ key: item.page_id, label: item.name });
      });
    }

    //  call another api for menu assigned
    const req1 = await fetch(`${process.env.apiUrl}/pages`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const res1 = await req1.json();
    if (res1.status == 'success') {
      res1.data.map((item) => {
        menuAccess.push({
          key: item.page_slug,
          label: item.page_title,
        });
      });
    }
    data = {
      pageAccess: pageAccess,
      menuAccess: menuAccess,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
